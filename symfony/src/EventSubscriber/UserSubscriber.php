<?php

namespace App\EventSubscriber;

use ApiPlatform\Symfony\EventListener\EventPriorities;
use App\Entity\User;
use App\Exception\ApiExceptionCustom409;
use App\Repository\UserRepository;
use App\Service\MailService;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

final class UserSubscriber implements EventSubscriberInterface
{
    private UserRepository $userRepository;
    private UserPasswordHasherInterface $passwordHasher;
    private MailService $mailService;

    public function __construct(
        UserRepository $userRepository,
        UserPasswordHasherInterface $passwordHasher,
        MailService $mailService,
    )
    {
        $this->userRepository = $userRepository;
        $this->passwordHasher = $passwordHasher;
        $this->mailService = $mailService;
    }

    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::VIEW => [
                ['userCheckEmail', EventPriorities::PRE_VALIDATE],
                ['userHashPassword', EventPriorities::POST_VALIDATE],
                ['userSendRegistrationEmail', EventPriorities::POST_WRITE],
            ]
        ];
    }

    /**
     * @param ViewEvent $event
     * @return void
     * @throws ApiExceptionCustom409
     */
    public function userCheckEmail(ViewEvent $event): void
    {
        $user = $event->getControllerResult();

        if (!$user instanceof User || !$user->getEmail() || $user->getId()) {
            return;
        }

        if ($this->userRepository->findOneBy(['email' => $user->getEmail()])) {
            throw new ApiExceptionCustom409(sprintf('Adresse email déjà enregistrée'));
        }
    }

    /**
     * @param ViewEvent $event
     * @return void
     */
    public function userHashPassword(ViewEvent $event): void
    {
        $user = $event->getControllerResult();

        if (!$user instanceof User || !$user->getPassword() || $user->getId()) {
            return;
        }

        $hashedPassword = $this->passwordHasher->hashPassword($user, $user->getPassword());

        $user->setPassword($hashedPassword);
    }

    /**
     * @param ViewEvent $event
     * @return void
     * @throws TransportExceptionInterface
     */
    public function userSendRegistrationEmail(ViewEvent $event): void
    {
        $user = $event->getControllerResult();

        if (!$user instanceof User || !$user->getId()) {
            return;
        }

        $this->mailService->sendRegistrationEmail($user);
    }
}