<?php

namespace App\EventSubscriber;

use ApiPlatform\Symfony\EventListener\EventPriorities;
use App\Entity\User;
use App\Exception\ApiExceptionCustom409;
use App\Repository\UserRepository;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

final class UserSubscriber implements EventSubscriberInterface
{
    private UserRepository $userRepository;
    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(UserRepository $userRepository, UserPasswordHasherInterface $passwordHasher)
    {
        $this->userRepository = $userRepository;
        $this->passwordHasher = $passwordHasher;
    }

    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::VIEW => [
                ['userEmailAlreadyRegistered', EventPriorities::PRE_VALIDATE],
                ['UserHashPassword', EventPriorities::POST_VALIDATE],
            ]
        ];
    }

    public function userEmailAlreadyRegistered(ViewEvent $event): void
    {
        /** @var User $user */
        $user = $event->getControllerResult();

        if (!$user instanceof User || !$user->getEmail()) {
            return;
        }

        if ($this->userRepository->findOneBy(['email' => $user->getEmail()])) {
            throw new ApiExceptionCustom409(sprintf('Adresse email déjà enregistrée'));
        }
    }

    public function UserHashPassword(ViewEvent $event): void
    {
        /** @var User $user */
        $user = $event->getControllerResult();

        if (!$user instanceof User || !$user->getPassword()) {
            return;
        }

        $hashedPassword = $this->passwordHasher->hashPassword($user, $user->getPassword());

        $user->setPassword($hashedPassword);
    }
}