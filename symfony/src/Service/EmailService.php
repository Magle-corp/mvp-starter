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
        $header = ['typ' => 'JWT', 'alg' => 'HS256'];
        $payload = ['user_id' => $user->getId()];

        $token = $this->JWTService->generate($header, $payload, getenv('JWT_SIGNUP_SECRET'));

        $email = (new TemplatedEmail())
            ->to($user->getEmail())
            ->subject('Finaliser votre inscription')
            ->htmlTemplate('emails/signUpValidation.html.twig')
            ->context([
                'front_base_url' => getenv('FRONT_BASE_URL'),
                'front_auth_uri' => '/authentication/signUpValidation?token=',
                'token' => $token
            ]);

        $this->mailer->send($email);
    }
}