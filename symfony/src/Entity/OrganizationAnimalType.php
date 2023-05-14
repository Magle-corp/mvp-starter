<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\OrganizationAnimalTypeRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: OrganizationAnimalTypeRepository::class)]
#[ApiResource(
    operations: [
        new Get(
            normalizationContext: ['groups' => ['org_animal_type_read']],
            security: "is_granted('ORG_ANIMAL_TYPE_READ', object)"
        ),
        new Post(
            denormalizationContext: ['groups' => ['org_animal_type_write']],
            securityPostDenormalize: "is_granted('ORG_ANIMAL_TYPE_CREATE', object)"
        ),
        new Put(
            denormalizationContext: ['groups' => ['org_animal_type_update']],
            security: "is_granted('ORG_ANIMAL_TYPE_UPDATE', object)"
        )
    ]
)]
class OrganizationAnimalType extends AnimalType
{
    #[ORM\ManyToOne(inversedBy: 'animalTypes')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['org_animal_type_write', 'animal_types_read', 'org_animal_type_read'])]
    private ?Organization $organization = null;

    public function getOrganization(): ?Organization
    {
        return $this->organization;
    }

    public function setOrganization(?Organization $organization): self
    {
        $this->organization = $organization;

        return $this;
    }
}
