<?php

namespace App\Security\Voter;

use App\Entity\Organization;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;

class OrganizationVoter extends Voter
{
    const ORGANIZATION_CREATE = 'ORGANIZATION_CREATE';
    const ORGANIZATION_UPDATE = 'ORGANIZATION_UPDATE';

    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    protected function supports(string $attribute, mixed $subject): bool
    {
        $supportsAttribute = in_array($attribute, [self::ORGANIZATION_CREATE, self::ORGANIZATION_UPDATE]);
        $supportsSubject = $subject instanceof Organization;

        return $supportsAttribute && $supportsSubject;
    }

    protected function voteOnAttribute(string $attribute, mixed $subject, TokenInterface $token): bool
    {
        switch ($attribute) {
            case self::ORGANIZATION_CREATE:
                return $subject->getOwner() == $token->getUser();
            case self::ORGANIZATION_UPDATE:
                return $subject->getOwner() == $token->getUser();
            default:
                return false;
        }
    }
}