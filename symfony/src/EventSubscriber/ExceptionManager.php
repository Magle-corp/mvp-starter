<?php

namespace App\EventSubscriber;

use App\Exception\ApiExceptionCustom409;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpKernel\KernelEvents;

final class ExceptionManager implements EventSubscriberInterface
{

    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::EXCEPTION => ['customException'],
        ];
    }

    public function customException(ExceptionEvent $event)
    {
        $currentExceptionThrowable = $event->getThrowable();
        $exceptionThrowableClass = get_class($currentExceptionThrowable);

        if (!$currentExceptionThrowable instanceof ApiExceptionCustom409)
        {
            $event->setThrowable(new $exceptionThrowableClass(
                'Un problème technique est survenu, veuillez réessayer ultérieurement'
            ));
        }
    }
}