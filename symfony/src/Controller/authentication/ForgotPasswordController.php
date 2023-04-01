<?php

namespace App\Controller\authentication;

use App\Entity\User;
use App\Service\EmailService;
use App\Service\ResponseService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class ForgotPasswordController extends AbstractController
{
    private ResponseService $responseService;
    private EntityManagerInterface $entityManager;
    private EmailService $emailService;

    public function __construct(
        ResponseService        $responseService,
        EntityManagerInterface $entityManager,
        EmailService $emailService
    )
    {
        $this->responseService = $responseService;
        $this->entityManager = $entityManager;
        $this->emailService = $emailService;
    }

    public function __invoke(Request $request)
    {
        $requestContent = json_decode($request->getContent(), true);

        if (!array_key_exists('email', $requestContent)) {
            return $this->responseService->error();
        }

        $userEmail = $requestContent['email'];

        $userRepository = $this->entityManager->getRepository(User::class);
        $user = $userRepository->findOneBy(['email' => $userEmail]);

        if (!$user) {
            return $this->responseService->create('Aucun compte corresponsant', 409);
        }

        $this->emailService->sendResetPasswordEmail($user);

        return $this->responseService->create('OK', 200);
    }
}