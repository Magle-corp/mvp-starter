<?php

namespace App\Security\Voter;

use App\Service\VoterService;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;

class OrganizationAnimalRaceVoter extends Voter
{
    const ANIMAL_RACES_READ = 'ANIMAL_RACES_READ';
    const ORG_ANIMAL_RACE_CREATE = 'ORG_ANIMAL_RACE_CREATE';
    const ORG_ANIMAL_RACE_READ = 'ORG_ANIMAL_RACE_READ';
    const ORG_ANIMAL_RACE_UPDATE = 'ORG_ANIMAL_RACE_UPDATE';
    const ORG_ANIMAL_RACE_DELETE = 'ORG_ANIMAL_RACE_DELETE';

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
            self::ANIMAL_RACES_READ,
            self::ORG_ANIMAL_RACE_CREATE,
            self::ORG_ANIMAL_RACE_READ,
            self::ORG_ANIMAL_RACE_UPDATE,
            self::ORG_ANIMAL_RACE_DELETE,
        ]);
    }

    protected function voteOnAttribute(string $attribute, mixed $subject, TokenInterface $token): bool
    {
        if (
            $attribute === self::ORG_ANIMAL_RACE_CREATE ||
            $attribute === self::ORG_ANIMAL_RACE_READ ||
            $attribute === self::ORG_ANIMAL_RACE_UPDATE ||
            $attribute === self::ORG_ANIMAL_RACE_DELETE
        ) {
            $userHasRaceOrganization = $this->voterService->userHasOrganization($token->getUser(), $subject->getOrganization()->getId());

            if (property_exists($subject->getType(), 'organization')) {
                $userHasRaceTypeOrganization = $this->voterService->userHasOrganization($token->getUser(), $subject->getType()->getOrganization()->getId());

                return $userHasRaceOrganization && $userHasRaceTypeOrganization;
            }

            return $userHasRaceOrganization;
        }

        if ($attribute === self::ANIMAL_RACES_READ) {
            $requestAnimalsOrganizationId = $this->requestStack->getCurrentRequest()->attributes->get('id');
            return $this->voterService->userHasOrganization($token->getUser(), $requestAnimalsOrganizationId);
        }

        return false;
    }
}