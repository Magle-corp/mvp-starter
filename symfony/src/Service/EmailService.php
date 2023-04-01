<?php

namespace App\Service;

use App\Entity\User;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mailer\MailerInterface;

class EmailService
{
    private MailerInterface $mailer;
    private JWTService $JWTService;

    public function __construct(
        MailerInterface $mailer,
        JWTService      $JWTService,
    )
    {
        $this->mailer = $mailer;
        $this->JWTService = $JWTService;
    }

    public function sendTemplateEmail(string $email, string $subject, string $template, array $context): void
    {
        $email = (new TemplatedEmail())
            ->to($email)
            ->subject($subject)
            ->htmlTemplate($template)
            ->context($context);

        $this->mailer->send($email);
    }

    public function sendSignUpValidationEmail(User $user): void
    {
        $payload = ['user_id' => $user->getId()];
        $token = $this->JWTService->generate($payload, getenv('JWT_SIGNUP_VALIDATION_SECRET'));
        $linkForSignUpValidation = getenv('FRONT_BASE_URL') . '/authentication/signUpValidation?token=' . $token;

        $tokenExpirationDate = $this->JWTService->getExpirationDate($token);
        $tokenExpirationDelay = $this->JWTService->getExpirationDelay($token,'h');

        $this->sendTemplateEmail(
            $user->getEmail(),
            'Finaliser votre inscription',
            'emails/signUpValidation.html.twig',
            [
                'link_for_sign_up_validation' => $linkForSignUpValidation,
                'token_expiration_date' => $tokenExpirationDate,
                'token_expiration_delay' => $tokenExpirationDelay,
            ]
        );
    }

    public function sendResetPasswordEmail(User $user): void
    {
        $payload = ['user_id' => $user->getId()];
        $token = $this->JWTService->generate($payload, getenv('JWT_RESET_PASSWORD_SECRET'));
        $linkForResetPassword = getenv('FRONT_BASE_URL') . '/authentication/resetPassword?token=' . $token;

        $tokenExpirationDate = $this->JWTService->getExpirationDate($token);
        $tokenExpirationDelay = $this->JWTService->getExpirationDelay($token,'h');

        $this->sendTemplateEmail(
            $user->getEmail(),
            'Changer votre mot de passe',
            'emails/forgotPassword.html.twig',
            [
                'link_for_reset_password' => $linkForResetPassword,
                'token_expiration_date' => $tokenExpirationDate,
                'token_expiration_delay' => $tokenExpirationDelay,
            ]
        );
    }
}