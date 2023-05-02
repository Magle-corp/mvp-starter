<?php

namespace App\Controller\user;

use App\Entity\TokenSignUp;
use App\Entity\User;
use App\Service\EmailService;
use App\Service\JWTService;
use App\Service\ResponseService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class ReSendSignUpValidationEmailController extends AbstractController
{
    private JWTService $JWTService;
    private ResponseService $responseService;
    private EntityManagerInterface $entityManager;
    private EmailService $emailService;

    public function __construct(
        JWTService             $JWTService,
        ResponseService        $responseService,
        EntityManagerInterface $entityManager,
        EmailService           $emailService
    )
    {
        $this->JWTService = $JWTService;
        $this->responseService = $responseService;
        $this->entityManager = $entityManager;
        $this->emailService = $emailService;
    }

    public function __invoke(Request $request): Response
    {
        $requestContent = json_decode($request->getContent(), true);

        if (!array_key_exists('token', $requestContent)) {
            return $this->responseService->error();
        }

        $validationToken = $requestContent['token'];

        $isValidToken = $this->JWTService->isValid($validationToken);
        $isValidSecret = $this->JWTService->check($validationToken, getenv('JWT_SIGNUP_VALIDATION_SECRET'));

        if (!$isValidToken || !$isValidSecret) {
            return $this->responseService->create('Le lien n\'est pas valide', 409);
        }

        $tokenPayload = $this->JWTService->getPayload($validationToken);

        if (!array_key_exists('user_id', $tokenPayload)) {
            return $this->responseService->error();
        }

        $userId = $tokenPayload['user_id'];

        $userRepository = $this->entityManager->getRepository(User::class);
        $user = $userRepository->findOneBy(['id' => $userId]);

        /* If the token user id isn't registered returns an HTTP response with status 200 to not communicate confidential information */
        if (!$user) {
            return $this->responseService->success();
        }

        if ($user->isVerified()) {
            return $this->responseService->create('Compte déjà vérifié', 409);
        }

        $tokenPayload = ['user_id' => $user->getId()];
        $token = $this->JWTService->generate($tokenPayload, getenv('JWT_SIGNUP_VALIDATION_SECRET'));

        $tokenSignUp = new TokenSignUp();
        $tokenSignUp->setSignUpToken($token);
        $tokenSignUp->setUsername($user->getEmail());
        $this->entityManager->persist($tokenSignUp);
        $this->entityManager->flush();

        $this->emailService->sendSignUpValidationEmail($user, $token);

        return $this->responseService->success();
    }
}