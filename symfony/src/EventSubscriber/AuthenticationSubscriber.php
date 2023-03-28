<?php

namespace App\EventSubscriber;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Security\Core\Exception\BadCredentialsException;
use Symfony\Component\Security\Http\Event\LoginFailureEvent;

final class AuthenticationSubscriber implements EventSubscriberInterface
{
    public static function getSubscribedEvents(): array
    {
        return [
            LoginFailureEvent::class => ['customLoginFailureEventException']
        ];
    }

    public function customLoginFailureEventException(LoginFailureEvent $event): void
    {
        if ($event->getException() instanceof BadCredentialsException) {
            $customResponse = $event->getResponse()->setContent('{"message":"Identifiants invalides"}');
            $event->setResponse($customResponse);
        }
    }
}