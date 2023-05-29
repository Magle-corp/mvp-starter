<?php

namespace App\Security\Voter;

use App\Service\VoterService;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;

class AnimalAvatarVoter extends Voter
{
    const ANIMAL_AVATAR_DELETE = 'ANIMAL_AVATAR_DELETE';

    private VoterService $voterService;

    public function __construct(
        VoterService $voterService,
    )
    {
        $this->voterService = $voterService;
    }

    protected function supports(string $attribute, mixed $subject): bool
    {
        return in_array($attribute, [
            self::ANIMAL_AVATAR_DELETE,
        ]);
    }

    protected function voteOnAttribute(string $attribute, mixed $subject, TokenInterface $token): bool
    {
        if (
            $attribute === self::ANIMAL_AVATAR_DELETE
        ) {
            return $this->voterService->userHasOrganization($token->getUser(), $subject->getAnimal()->getOrganization()->getId());
        }

        return false;
    }
}