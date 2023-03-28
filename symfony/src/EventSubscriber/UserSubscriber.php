<?php

namespace App\EventSubscriber;

use ApiPlatform\Symfony\EventListener\EventPriorities;
use App\Entity\User;
use App\Repository\UserRepository;
use App\Service\MailService;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

final class UserSubscriber implements EventSubscriberInterface
{
    private UserRepository $userRepository;
    private UserPasswordHasherInterface $passwordHasher;
    private MailService $mailService;

    public function __construct(
        UserRepository              $userRepository,
        UserPasswordHasherInterface $passwordHasher,
        MailService                 $mailService,
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

    public function userCheckEmail(ViewEvent $event)
    {
        $user = $event->getControllerResult();

        if (!$user instanceof User || !$user->getEmail() || $user->getId()) {
            $event->setResponse(new Response('{"message":"Un problème technique est survenu, veuillez réessayer ultérieurement"}', 500));
            return;
        }

        if ($this->userRepository->findOneBy(['email' => $user->getEmail()])) {
            $event->setResponse(new Response('{"message":"Adresse email déjà enregistrée"}', 409));
        }
    }

    public function userHashPassword(ViewEvent $event): void
    {
        $user = $event->getControllerResult();

        if (!$user instanceof User || !$user->getPassword() || $user->getId()) {
            $event->setResponse(new Response('{"message":"Un problème technique est survenu, veuillez réessayer ultérieurement"}', 500));
            return;
        }

        $user->setPassword($this->passwordHasher->hashPassword($user, $user->getPassword()));
    }

    public function userSendRegistrationEmail(ViewEvent $event): void
    {
        $user = $event->getControllerResult();

        if (!$user instanceof User || !$user->getId() || $user->isVerified()) {
            $event->setResponse(new Response('{"message":"Un problème technique est survenu, veuillez réessayer ultérieurement"}', 500));
            return;
        }

        $this->mailService->sendRegistrationEmail($user);
    }
}