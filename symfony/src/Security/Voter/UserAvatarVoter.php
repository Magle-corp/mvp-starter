<?php

namespace App\Security\Voter;

use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;

class UserAvatarVoter extends Voter
{
    const USER_AVATAR_DELETE = 'USER_AVATAR_DELETE';

    protected function supports(string $attribute, mixed $subject): bool
    {
        return in_array($attribute, [
            self::USER_AVATAR_DELETE,
        ]);
    }

    protected function voteOnAttribute(string $attribute, mixed $subject, TokenInterface $token): bool
    {
        if (
            $attribute === self::USER_AVATAR_DELETE
        ) {
            return $token->getUser()->getId() === $subject->getUser()->getId();
        }

        return false;
    }
}