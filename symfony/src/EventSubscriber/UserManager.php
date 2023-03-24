<?php

namespace App\EventSubscriber;

use ApiPlatform\Symfony\EventListener\EventPriorities;
use App\Entity\User;
use App\Exception\ApiExceptionCustom409;
use App\Repository\UserRepository;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;

final class UserManager implements EventSubscriberInterface
{
    private UserRepository $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::VIEW => ['emailAlreadyRegistered', EventPriorities::PRE_VALIDATE],
        ];
    }

    public function emailAlreadyRegistered(ViewEvent $event): void
    {
        $user = $event->getControllerResult();

        if (!$user instanceof User) {
            return;
        }

        if ($this->userRepository->findOneBy(['email' => $user->getEmail()])) {
            throw new ApiExceptionCustom409(sprintf('Adresse email déjà enregistrée'));
        }
    }
}