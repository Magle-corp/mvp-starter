<?php

namespace App\Security\Voter;

use App\Service\VoterService;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;

class AnimalDocumentVoter extends Voter
{
    const ANIMAL_DOCUMENTS_READ = 'ANIMAL_DOCUMENTS_READ';
    const ANIMAL_DOCUMENT_DELETE = 'ANIMAL_DOCUMENT_DELETE';

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
            self::ANIMAL_DOCUMENTS_READ,
            self::ANIMAL_DOCUMENT_DELETE,
        ]);
    }

    protected function voteOnAttribute(string $attribute, mixed $subject, TokenInterface $token): bool
    {
        if (
            $attribute === self::ANIMAL_DOCUMENT_DELETE
        ) {
            return $this->voterService->userHasOrganization($token->getUser(), $subject->getAnimal()->getOrganization()->getId());
        }

        if ($attribute === self::ANIMAL_DOCUMENTS_READ) {
            $requestAnimalsOrganizationId = $this->requestStack->getCurrentRequest()->attributes->get('id');
            return $this->voterService->userHasOrganization($token->getUser(), $requestAnimalsOrganizationId);
        }

        return false;
    }
}