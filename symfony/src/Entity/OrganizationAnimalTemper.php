<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\OrganizationAnimalTemperRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: OrganizationAnimalTemperRepository::class)]
#[ApiResource(
    operations: [
        new Get(
            normalizationContext: ['groups' => ['org_animal_temper_read']],
            security: "is_granted('ORG_ANIMAL_TEMPER_READ', object)"
        ),
        new Post(
            denormalizationContext: ['groups' => ['org_animal_temper_write']],
            securityPostDenormalize: "is_granted('ORG_ANIMAL_TEMPER_CREATE', object)"
        ),
        new Put(
            denormalizationContext: ['groups' => ['org_animal_temper_update']],
            security: "is_granted('ORG_ANIMAL_TEMPER_UPDATE', object)"
        ),
        new Delete(
            security: "is_granted('ORG_ANIMAL_TEMPER_DELETE', object)"
        )
    ]
)]
class OrganizationAnimalTemper extends AnimalTemper
{
    #[ORM\ManyToOne(inversedBy: 'animalTempers')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['org_animal_temper_write', 'animal_tempers_read', 'org_animal_temper_read'])]
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
