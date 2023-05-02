<?php

namespace App\Security\Voter;

use App\Entity\Animal;
use App\Entity\User;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;

class AnimalVoter extends Voter
{
    const ANIMAL_CREATE = 'ANIMAL_CREATE';
    const ANIMAL_READ = 'ANIMAL_READ';

    protected function supports(string $attribute, mixed $subject): bool
    {
        $supportsAttribute = in_array($attribute, [self::ANIMAL_CREATE, self::ANIMAL_READ]);
        $supportsSubject = $subject instanceof Animal;

        return $supportsAttribute && $supportsSubject;
    }

    protected function voteOnAttribute(string $attribute, mixed $subject, TokenInterface $token): bool
    {
        switch ($attribute) {
            case self::ANIMAL_CREATE:
                return $this->userAndAnimalHasSameOrganization($token->getUser(), $subject);
            case self::ANIMAL_READ:
                return $this->userAndAnimalHasSameOrganization($token->getUser(), $subject);
            default:
                return false;
        }
    }

    private function userAndAnimalHasSameOrganization(User $user, Animal $animal): bool
    {
        $userOrganizations = $user->getOrganizations()->toArray();
        $userOrganizationsId = array_map(function ($organization) {
            return $organization->getId();
        }, $userOrganizations);

        return in_array($animal->getOrganization()->getId(), $userOrganizationsId);
    }
}