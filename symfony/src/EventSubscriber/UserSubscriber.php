<?php

namespace App\EventSubscriber;

use ApiPlatform\Symfony\EventListener\EventPriorities;
use App\Entity\User;
use App\Repository\UserRepository;
use App\Service\EmailService;
use App\Service\ResponseService;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

final class UserSubscriber implements EventSubscriberInterface
{
    private ResponseService $responseService;
    private UserRepository $userRepository;
    private UserPasswordHasherInterface $passwordHasher;
    private EmailService $emailService;

    public function __construct(
        ResponseService             $responseService,
        UserRepository              $userRepository,
        UserPasswordHasherInterface $passwordHasher,
        EmailService                $emailService,
    )
    {
        $this->responseService = $responseService;
        $this->userRepository = $userRepository;
        $this->passwordHasher = $passwordHasher;
        $this->emailService = $emailService;
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
            $event->setResponse($this->responseService->error());
            return;
        }

        if ($this->userRepository->findOneBy(['email' => $user->getEmail()])) {
            $event->setResponse($this->responseService->create('Adresse email déjà enregistrée', 409));
        }
    }

    public function userHashPassword(ViewEvent $event): void
    {
        $user = $event->getControllerResult();

        if (!$user instanceof User || !$user->getPassword() || $user->getId()) {
            $event->setResponse($this->responseService->error());
            return;
        }

        $user->setPassword($this->passwordHasher->hashPassword($user, $user->getPassword()));
    }

    public function userSendRegistrationEmail(ViewEvent $event): void
    {
        $user = $event->getControllerResult();

        if (!$user instanceof User || !$user->getId() || $user->isVerified()) {
            $event->setResponse($this->responseService->error());
            return;
        }

        $this->emailService->sendRegistrationEmail($user);
    }
}