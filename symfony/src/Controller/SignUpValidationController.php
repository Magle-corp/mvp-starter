<?php

namespace App\Controller;

use App\Entity\User;
use App\Exception\ApiExceptionCustom401;
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

    /**
     * @param JWTService $JWTService
     * @param EntityManagerInterface $entityManager
     */
    public function __construct(
        JWTService $JWTService,
        EntityManagerInterface $entityManager
    )
    {
        $this->JWTService = $JWTService;
        $this->entityManager = $entityManager;
    }

    /**
     * @param Request $request
     * @return Response
     * @throws ApiExceptionCustom401
     */
    public function __invoke(Request $request): Response
    {
        $validationToken = $request->query->get('token');

        $isExpiredToken = $this->JWTService->isExpired($validationToken);
        $isValidToken = $this->JWTService->isValid($validationToken);
        $isValidSecret = $this->JWTService->check($validationToken, getenv('JWT_REGISTRATION_SECRET'));

        if ($isExpiredToken || !$isValidToken || !$isValidSecret) {
            $exception = new ApiExceptionCustom401();
            $exception->setErrorMessage('Token invalide');

            throw $exception;
        } else {
            $userRepository = $this->entityManager->getRepository(User::class);
            $user = $userRepository->findOneBy(['id' => $this->JWTService->getPayload($validationToken)['user_id']]);
            $user->setVerified(true);

            $this->entityManager->persist($user);
            $this->entityManager->flush();

            return new Response('OK');
        }
    }
}