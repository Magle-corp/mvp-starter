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

        $payload['user'] = [
            'id' => $user->getId(),
        ];

        if ($user->getAvatar() !== null) {
            $payload['user']['avatar'] = [
                'id' => $user->getAvatar()->getId(),
                'filePath' => $user->getAvatar()->getFilePath(),
                'created' => $user->getAvatar()->getCreated(),
            ];
        }

        $userOrganizations = $user->getOrganizations()->toArray();
        $organizations = [];

        foreach ($userOrganizations as $userOrganization) {
            $organization = [
                'id' => $userOrganization->getId(),
                'name' => $userOrganization->getName(),
                'public' => $userOrganization->isPublic(),
                'address' => $userOrganization->getAddress(),
                'city' => $userOrganization->getCity(),
                'zipCode' => $userOrganization->getZipCode(),
                'phone' => $userOrganization->getPhone(),
                'email' => $userOrganization->getEmail()
            ];

            if ($userOrganization->getAvatar() !== null) {
                $organization['avatar'] = [
                    'id' => $userOrganization->getAvatar()->getId(),
                    'filePath' => $userOrganization->getAvatar()->getFilePath(),
                    'created' => $userOrganization->getAvatar()->getCreated()
                ];
            }

            $organizations = [...$organizations, $organization];
        }

        $payload['organizations'] = $organizations;

        $event->setData($payload);
    }

}