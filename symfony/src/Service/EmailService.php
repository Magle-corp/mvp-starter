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

    public function sendSignUpValidationEmail(User $user, string $token): void
    {
        $linkForSignUpValidation = getenv('FRONT_BASE_URL') . '/authentication/signUpValidation?token=' . $token;

        $this->sendTemplateEmail(
            $user->getEmail(),
            'Finalisez votre inscription',
            'emails/signUpValidation.html.twig',
            [
                'link_for_sign_up_validation' => $linkForSignUpValidation,
                'token_expiration_date' => $this->JWTService->getExpirationDate($token),
                'token_expiration_delay' => $this->JWTService->getExpirationDelay($token,'H'),
            ]
        );
    }

    public function sendResetPasswordEmail(User $user, string $token): void
    {
        $linkForResetPassword = getenv('FRONT_BASE_URL') . '/authentication/resetPassword?token=' . $token;

        $this->sendTemplateEmail(
            $user->getEmail(),
            'Changer votre mot de passe',
            'emails/forgotPassword.html.twig',
            [
                'link_for_reset_password' => $linkForResetPassword,
                'token_expiration_date' => $this->JWTService->getExpirationDate($token),
                'token_expiration_delay' => $this->JWTService->getExpirationDelay($token,'H'),
            ]
        );
    }
}