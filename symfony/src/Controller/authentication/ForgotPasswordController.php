<?php

namespace App\Controller\authentication;

use App\Entity\TokenResetPassword;
use App\Entity\User;
use App\Service\EmailService;
use App\Service\JWTService;
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
    private JWTService $JWTService;

    public function __construct(
        ResponseService        $responseService,
        EntityManagerInterface $entityManager,
        EmailService           $emailService,
        JWTService             $JWTService,
    )
    {
        $this->responseService = $responseService;
        $this->entityManager = $entityManager;
        $this->emailService = $emailService;
        $this->JWTService = $JWTService;
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

        /* Returns an HTTP response with status 200 to not communicate confidential information */
        if (!$user) {
            return $this->responseService->create('OK', 200);
        }

        $tokenPayload = ['user_id' => $user->getId()];
        $token = $this->JWTService->generate($tokenPayload, getenv('JWT_RESET_PASSWORD_SECRET'));

        $tokenResetPassword = new TokenResetPassword();
        $tokenResetPassword->setResetPasswordToken($token);
        $tokenResetPassword->setUsername($user->getEmail());
        $this->entityManager->persist($tokenResetPassword);

        $this->entityManager->flush();

        $this->emailService->sendResetPasswordEmail($user, $token);

        return $this->responseService->create('OK', 200);
    }
}