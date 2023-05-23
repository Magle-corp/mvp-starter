<?php

namespace App\EventSubscriber;

use App\Service\ResponseService;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\KernelEvents;

final class ExceptionSubscriber implements EventSubscriberInterface
{
    private ResponseService $responseService;

    public function __construct(ResponseService $responseService)
    {
        $this->responseService = $responseService;
    }

    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::EXCEPTION => ['customKernelEventExceptions'],
        ];
    }

    public function customKernelEventExceptions(ExceptionEvent $event): void
    {
        if ($event->getThrowable() instanceof AccessDeniedHttpException) {
            $event->setResponse($this->responseService->forbidden());
            return;
        }

//        $event->setResponse($this->responseService->error());
        $event->setResponse($this->responseService->debug($event->getThrowable()->getMessage()));
    }
}