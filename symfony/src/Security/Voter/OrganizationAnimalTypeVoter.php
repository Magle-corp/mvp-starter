<?php

namespace App\Security\Voter;

use App\Service\VoterService;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;

class OrganizationAnimalTypeVoter extends Voter
{
    const ANIMAL_TYPES_READ = 'ANIMAL_TYPES_READ';
    const ORG_ANIMAL_TYPE_CREATE = 'ORG_ANIMAL_TYPE_CREATE';
    const ORG_ANIMAL_TYPE_READ = 'ORG_ANIMAL_TYPE_READ';
    const ORG_ANIMAL_TYPE_UPDATE = 'ORG_ANIMAL_TYPE_UPDATE';
    const ORG_ANIMAL_TYPE_DELETE = 'ORG_ANIMAL_TYPE_DELETE';

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
            self::ANIMAL_TYPES_READ,
            self::ORG_ANIMAL_TYPE_CREATE,
            self::ORG_ANIMAL_TYPE_READ,
            self::ORG_ANIMAL_TYPE_UPDATE,
            self::ORG_ANIMAL_TYPE_DELETE,
        ]);
    }

    protected function voteOnAttribute(string $attribute, mixed $subject, TokenInterface $token): bool
    {
        if (
            $attribute === self::ORG_ANIMAL_TYPE_CREATE ||
            $attribute === self::ORG_ANIMAL_TYPE_READ ||
            $attribute === self::ORG_ANIMAL_TYPE_UPDATE ||
            $attribute === self::ORG_ANIMAL_TYPE_DELETE
        ) {
            return $this->voterService->userHasOrganization($token->getUser(), $subject->getOrganization()->getId());
        }

        if ($attribute === self::ANIMAL_TYPES_READ) {
            $requestAnimalsOrganizationId = $this->requestStack->getCurrentRequest()->attributes->get('id');
            return $this->voterService->userHasOrganization($token->getUser(), $requestAnimalsOrganizationId);
        }

        return false;
    }
}