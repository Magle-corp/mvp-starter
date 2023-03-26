<?php

namespace App\EventSubscriber;

use App\Exception\ApiExceptionCustom409;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Exception\BadCredentialsException;
use Symfony\Component\Security\Http\Event\LoginFailureEvent;

final class ExceptionManager implements EventSubscriberInterface
{

    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::EXCEPTION => ['customKernelEventExceptions'],
            LoginFailureEvent::class => ['customLoginFailureEventException']
        ];
    }

    public function customKernelEventExceptions(ExceptionEvent $event)
    {
        dump($event);
        die();

        $exceptionThrowable = $event->getThrowable();

        if (!$exceptionThrowable instanceof ApiExceptionCustom409)
        {
            $exceptionThrowableClass = get_class($exceptionThrowable);
            $event->setThrowable(new $exceptionThrowableClass(
                'Un problème technique est survenu, veuillez réessayer ultérieurement'
            ));
        }
    }

    public function customLoginFailureEventException(LoginFailureEvent $event)
    {
        if ($event->getException() instanceof BadCredentialsException)
        {
            $customResponse = $event->getResponse()->setContent('{"code":401,"message":"Identifiants invalides"}');
            $event->setResponse($customResponse);
        }
    }
}