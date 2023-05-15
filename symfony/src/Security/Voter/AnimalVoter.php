<?php

namespace App\Security\Voter;

use App\Service\VoterService;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;

class AnimalVoter extends Voter
{
    const ANIMALS_READ = 'ANIMALS_READ';
    const ANIMAL_CREATE = 'ANIMAL_CREATE';
    const ANIMAL_READ = 'ANIMAL_READ';
    const ANIMAL_UPDATE = 'ANIMAL_UPDATE';
    const ANIMAL_DELETE = 'ANIMAL_DELETE';

    private VoterService $voterService;
    private RequestStack $requestStack;

    public function __construct(
        VoterService $voterService,
        RequestStack $requestStack
    )
    {
        $this->voterService = $voterService;
        $this->requestStack = $requestStack;
    }

    protected function supports(string $attribute, mixed $subject): bool
    {
        return in_array($attribute, [
            self::ANIMALS_READ,
            self::ANIMAL_CREATE,
            self::ANIMAL_READ,
            self::ANIMAL_UPDATE,
            self::ANIMAL_DELETE
        ]);
    }

    protected function voteOnAttribute(string $attribute, mixed $subject, TokenInterface $token): bool
    {
        if (
            $attribute === self::ANIMAL_CREATE ||
            $attribute === self::ANIMAL_READ ||
            $attribute === self::ANIMAL_UPDATE ||
            $attribute === self::ANIMAL_DELETE
        ) {
            return $this->voterService->userHasOrganization($token->getUser(), $subject->getOrganization()->getId());
        }

        if ($attribute === self::ANIMALS_READ) {
            $requestAnimalsOrganizationId = $this->requestStack->getCurrentRequest()->attributes->get('id');
            return $this->voterService->userHasOrganization($token->getUser(), $requestAnimalsOrganizationId);
        }

        return false;
    }
}