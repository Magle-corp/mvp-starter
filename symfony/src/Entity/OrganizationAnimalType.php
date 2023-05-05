<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Post;
use App\Repository\OrganizationAnimalTypeRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: OrganizationAnimalTypeRepository::class)]
#[ApiResource(
    operations: [
        new Post(
            denormalizationContext: ['groups' => ['org_animal_type_write']],
            securityPostDenormalize: "is_granted('ORG_ANIMAL_TYPE_CREATE', object)"
        )
    ]
)]
class OrganizationAnimalType extends AnimalType
{
    #[ORM\ManyToOne(inversedBy: 'animalTypes')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['org_animal_type_write'])]
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
