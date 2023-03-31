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

    public function sendRegistrationEmail(User $user): void
    {
        $payload = ['user_id' => $user->getId()];
        $token = $this->JWTService->generate($payload, getenv('JWT_SIGNUP_SECRET'));
        $linkForValidateEmail = getenv('FRONT_BASE_URL') . '/authentication/signUpValidation?token=' . $token;

        $this->sendTemplateEmail(
            $user->getEmail(),
            'Finaliser votre inscription',
            'emails/signUpValidation.html.twig',
            [
                'link_for_validate_email' => $linkForValidateEmail,
            ]
        );
    }

    public function sendResetPasswordEmail(User $user): void
    {
        $payload = ['user_id' => $user->getId()];
        $token = $this->JWTService->generate($payload, getenv('JWT_SIGNUP_SECRET'));
        $linkForResetPassword = getenv('FRONT_BASE_URL') . '/authentication/resetPassword?token=' . $token;

        $this->sendTemplateEmail(
            $user->getEmail(),
            'Changer votre mot de passe',
            'emails/forgotPassword.html.twig',
            [
                'link_for_reset_password' => $linkForResetPassword,
            ]
        );
    }
}