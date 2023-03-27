<?php
namespace App\Service;

use App\Entity\User;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

class MailService
{
    private MailerInterface $mailer;
    private JWTService $JWTService;

    /**
     * @param MailerInterface $mailer
     * @param JWTService $JWTService
     */
    public function __construct(
        MailerInterface $mailer,
        JWTService $JWTService,
    )
    {
        $this->mailer = $mailer;
        $this->JWTService = $JWTService;
    }

    /**
     * @param string $to
     * @param string $subject
     * @param string $text
     * @return void
     * @throws TransportExceptionInterface
     */
    public function send(
        string $to,
        string $subject,
        string $text,
    ): void
    {
        $email = (new Email())
            ->to($to)
            ->subject($subject)
            ->text($text);

        $this->mailer->send($email);
    }

    /**
     * @param User $user
     * @return void
     * @throws TransportExceptionInterface
     */
    public function sendRegistrationEmail(User $user): void
    {
        $header = [
            'typ' => 'JWT',
            'alg' => 'HS256'
        ];

        $payload = [
            'user_id' => $user->getId()
        ];

        $token = $this->JWTService->generate($header, $payload, getenv('JWT_REGISTRATION_SECRET'));

        $this->send($user->getEmail(), 'Finaliser votre inscription', $token);
    }
}