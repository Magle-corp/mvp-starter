<?php

namespace App\Controller;

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
        $isValidSecret = $this->JWTService->check($validationToken, getenv('JWT_REGISTRATION_SECRET'));

        if ($isExpiredToken || !$isValidToken || !$isValidSecret) {
            return $this->responseService->create('Le token n\'est pas valide', 401);
        }

        $tokenPayload = $this->JWTService->getPayload($validationToken);

        if (!array_key_exists('user_id', $tokenPayload)) {
            return $this->responseService->error();
        }

        $userId = $tokenPayload['user_id'];

        $userRepository = $this->entityManager->getRepository(User::class);
        $user = $userRepository->findOneBy(['id' => $userId]);

        if (!$user) {
            return $this->responseService->create('Aucun compte correspondant', 409);
        }

        if ($user->isVerified()) {
            return $this->responseService->create('Compte déjà vérifié', 409);
        }

        $user->setVerified(true);

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        return $this->responseService->create('OK', 200);
    }
}