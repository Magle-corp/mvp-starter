<?php

namespace App\Service;

use Symfony\Component\Security\Core\User\UserInterface;

class VoterService
{
    public function userHasOrganization(UserInterface $user, string $organizationIdOfSubject): bool
    {
        $userOrganizations = $user->getOrganizations()->toArray();
        $userOrganizationsId = array_map(function ($organization) {
            return $organization->getId();
        }, $userOrganizations);

        return in_array($organizationIdOfSubject, $userOrganizationsId);
    }
}