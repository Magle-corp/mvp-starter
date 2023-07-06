<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Post;
use App\Controller\MediaObjectController;
use App\Entity\Traits\MediaObject;
use App\Repository\OrganizationAvatarRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

#[Vich\Uploadable]
#[ORM\Entity(repositoryClass: OrganizationAvatarRepository::class)]
#[ApiResource(
    operations: [
        new Post(
            controller: MediaObjectController::class,
            validationContext: ['groups' => ['Default', 'organization_avatar_create']],
            deserialize: false
        ),
        new Delete(
            security: "is_granted('ORGANIZATION_AVATAR_DELETE', object)"
        )
    ],
    normalizationContext: ['groups' => 'organization_avatar_read']
)]
class OrganizationAvatar
{
    use MediaObject;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups([
        'organization_avatar_read'
    ])]
    private ?int $id = null;

    #[ORM\OneToOne(inversedBy: 'avatar')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Organization $organization = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getOrganization(): ?Organization
    {
        return $this->organization;
    }

    public function setOrganization(Organization $organization): self
    {
        $this->organization = $organization;

        return $this;
    }
}
