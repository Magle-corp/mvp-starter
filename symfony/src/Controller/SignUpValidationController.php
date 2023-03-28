<?php

namespace App\Controller;

use App\Entity\User;
use App\Service\JWTService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class SignUpValidationController extends AbstractController
{
    private JWTService $JWTService;
    private EntityManagerInterface $entityManager;

    public function __construct(
        JWTService             $JWTService,
        EntityManagerInterface $entityManager
    )
    {
        $this->JWTService = $JWTService;
        $this->entityManager = $entityManager;
    }

    public function __invoke(Request $request): Response
    {
        $requestContent = json_decode($request->getContent(), true);

        if (!array_key_exists('token', $requestContent)) {
            return new Response('{"message":"Un problème technique est survenu, veuillez réessayer ultérieurement"}', 500);
        }

        $validationToken = $requestContent['token'];

        $isExpiredToken = $this->JWTService->isExpired($validationToken);
        $isValidToken = $this->JWTService->isValid($validationToken);
        $isValidSecret = $this->JWTService->check($validationToken, getenv('JWT_REGISTRATION_SECRET'));

        if ($isExpiredToken || !$isValidToken || !$isValidSecret) {
            return new Response('{"message":"Le token n\'est pas valide"}', 401);
        }

        $tokenPayload = $this->JWTService->getPayload($validationToken);

        if (!array_key_exists('user_id', $tokenPayload)) {
            return new Response('{"message":"Un problème technique est survenu, veuillez réessayer ultérieurement"}', 500);
        }

        $userId = $tokenPayload['user_id'];

        $userRepository = $this->entityManager->getRepository(User::class);
        $user = $userRepository->findOneBy(['id' => $userId]);

        if (!$user) {
            return new Response('{"message":"Aucun compte correspondant"}', 409);
        }

        if ($user->isVerified()) {
            return new Response('{"message":"Compte déjà vérifié"}', 409);
        }

        $user->setVerified(true);

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        return new Response('{"message":"OK"}', 200);
    }
}