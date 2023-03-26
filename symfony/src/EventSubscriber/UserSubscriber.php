<?php

namespace App\EventSubscriber;

use ApiPlatform\Symfony\EventListener\EventPriorities;
use App\Entity\User;
use App\Exception\ApiExceptionCustom409;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;

final class UserSubscriber implements EventSubscriberInterface
{
    private UserProviderInterface $userProvider;
    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(UserProviderInterface $userProvider, UserPasswordHasherInterface $passwordHasher)
    {
        $this->userProvider = $userProvider;
        $this->passwordHasher = $passwordHasher;
    }

    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::VIEW => [
                ['userEmailAlreadyRegistered', EventPriorities::PRE_VALIDATE],
                ['userHashPassword', EventPriorities::POST_VALIDATE],
                ['test', EventPriorities::POST_WRITE],
            ]
        ];
    }

    public function test(ViewEvent $event)
    {
        dump($event);
        die();
    }

    public function userEmailAlreadyRegistered(ViewEvent $event): void
    {
        /** @var User $user */
        $user = $event->getControllerResult();

        if (!$user instanceof User || !$user->getEmail()) {
            return;
        }

        if ($this->userProvider->loadUserByIdentifier($user->getEmail())) {
            throw new ApiExceptionCustom409(sprintf('Adresse email déjà enregistrée'));
        }
    }

    public function userHashPassword(ViewEvent $event): void
    {
        /** @var User $user */
        $user = $event->getControllerResult();

        if (!$user instanceof User || !$user->getPassword() || $user->getId()) {
            return;
        }

        $hashedPassword = $this->passwordHasher->hashPassword($user, $user->getPassword());

        $user->setPassword($hashedPassword);
    }
}