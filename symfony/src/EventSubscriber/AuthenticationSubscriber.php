<?php

namespace App\EventSubscriber;

use App\Service\ResponseService;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;
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
            LoginSuccessEvent::class => ['customLoginSuccessEventException'],
            'lexik_jwt_authentication.on_jwt_created' => ['customTokenPayload'],
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

    public function customTokenPayload(JWTCreatedEvent $event): void
    {
        $payload = $event->getData();
        $user = $event->getUser();

        $payload['user_id'] = $user->getId();

        $userOrganizations = $user->getOrganizations()->toArray();
        $organizations = [];
        foreach ($userOrganizations as $organization) {
            $organizations = [...$organizations, [
                'id' => $organization->getId(),
                'name' => $organization->getName(),
                'public' => $organization->isPublic()
            ]];
        }
        $payload['organizations'] = $organizations;

        $event->setData($payload);
    }

}