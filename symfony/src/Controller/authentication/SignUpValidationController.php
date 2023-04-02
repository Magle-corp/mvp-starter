<?php

namespace App\Controller\authentication;

use App\Entity\TokenSignUp;
use App\Entity\User;
use App\Service\JWTService;
use App\Service\ResponseService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class SignUpValidationController extends AbstractController
{
    private JWTService $JWTService;
    private ResponseService $responseService;
    private EntityManagerInterface $entityManager;

    public function __construct(
        JWTService             $JWTService,
        ResponseService        $responseService,
        EntityManagerInterface $entityManager
    )
    {
        $this->JWTService = $JWTService;
        $this->responseService = $responseService;
        $this->entityManager = $entityManager;
    }

    public function __invoke(Request $request): Response
    {
        $requestContent = json_decode($request->getContent(), true);

        if (!array_key_exists('token', $requestContent)) {
            return $this->responseService->error();
        }

        $validationToken = $requestContent['token'];

        $isExpiredToken = $this->JWTService->isExpired($validationToken);
        $isValidToken = $this->JWTService->isValid($validationToken);
        $isValidSecret = $this->JWTService->check($validationToken, getenv('JWT_SIGNUP_VALIDATION_SECRET'));

        if ($isExpiredToken) {
            return $this->responseService->create('Le lien n\'est plus valide', 401);
        }

        if (!$isValidToken || !$isValidSecret) {
            return $this->responseService->create('Le lien n\'est pas valide', 409);
        }

        $tokenSignUpRepository = $this->entityManager->getRepository(TokenSignUp::class);
        $latestRegisteredTokenSignUp = $tokenSignUpRepository->findOneBy(['signUpToken' => $validationToken]);

        if (!$latestRegisteredTokenSignUp) {
            return $this->responseService->error();
        }

        if ($latestRegisteredTokenSignUp->isUsed()) {
            return $this->responseService->create('Le lien a déjà été utilisé', 409);
        }

        $tokenPayload = $this->JWTService->getPayload($validationToken);

        if (!array_key_exists('user_id', $tokenPayload)) {
            return $this->responseService->error();
        }

        $userId = $tokenPayload['user_id'];

        $userRepository = $this->entityManager->getRepository(User::class);
        $user = $userRepository->findOneBy(['id' => $userId]);

        /* Returns an HTTP response with status 200 to not communicate confidential information */
        if (!$user) {
            return $this->responseService->create('OK', 200);
        }

        if ($user->isVerified()) {
            return $this->responseService->create('Compte déjà vérifié', 409);
        }

        $latestRegisteredTokenSignUp->setUsed(true);
        $this->entityManager->persist($latestRegisteredTokenSignUp);

        $user->setVerified(true);
        $this->entityManager->persist($user);

        $this->entityManager->flush();

        return $this->responseService->create('OK', 200);
    }
}