<?php

namespace App\EventSubscriber;

use App\Service\ResponseService;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Security\Core\Exception\BadCredentialsException;
use Symfony\Component\Security\Http\Event\LoginFailureEvent;
use Symfony\Component\Security\Http\Event\LoginSuccessEvent;

final class AuthenticationSubscriber implements EventSubscriberInterface
{
    private ResponseService $responseService;

    public function __construct(ResponseService $responseService)
    {
        $this->responseService = $responseService;
    }

    public static function getSubscribedEvents(): array
    {
        return [
            LoginFailureEvent::class => ['customLoginFailureEventException'],
            LoginSuccessEvent::class => ['customLoginSuccessEventException']
        ];
    }

    public function customLoginFailureEventException(LoginFailureEvent $event): void
    {
        if ($event->getException() instanceof BadCredentialsException) {
            $event->setResponse($this->responseService->create('Identifiants invalides', 401));
        }
    }

    public function customLoginSuccessEventException(LoginSuccessEvent $event): void
    {
        if (!$event->getAuthenticatedToken()->getUser()->isVerified()) {
            $event->setResponse($this->responseService->create("Veuillez confirmer votre inscription pour pouvoir vous connecter", 403));
        }
    }
}