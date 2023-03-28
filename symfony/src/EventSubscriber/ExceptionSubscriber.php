<?php

namespace App\EventSubscriber;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpKernel\KernelEvents;

final class ExceptionSubscriber implements EventSubscriberInterface
{
    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::EXCEPTION => ['customKernelEventExceptions'],
        ];
    }

    public function customKernelEventExceptions(ExceptionEvent $event): void
    {
        $eventThrowableClass = get_class($event->getThrowable());
        $event->setThrowable(new $eventThrowableClass(
            'Un problème technique est survenu, veuillez réessayer ultérieurement'
        ));
    }
}