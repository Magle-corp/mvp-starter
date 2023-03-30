<?php

namespace App\Service;

use App\Entity\User;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

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

    public function send(string $to, string $subject, string $text): void
    {
        $email = (new Email())
            ->to($to)
            ->subject($subject)
            ->text($text);

        $this->mailer->send($email);
    }

    public function sendRegistrationEmail(User $user): void
    {
        $payload = ['user_id' => $user->getId()];
        $token = $this->JWTService->generate($payload, getenv('JWT_SIGNUP_SECRET'));
        $linkForValidateEmail = getenv('FRONT_BASE_URL') . '/authentication/signUpValidation?token=' . $token;

        $email = (new TemplatedEmail())
            ->to($user->getEmail())
            ->subject('Finaliser votre inscription')
            ->htmlTemplate('emails/signUpValidation.html.twig')
            ->context([
                'link_for_validate_email' => $linkForValidateEmail,
            ]);

        $this->mailer->send($email);
    }
}