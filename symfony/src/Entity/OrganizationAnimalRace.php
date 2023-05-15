<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\OrganizationAnimalRaceRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: OrganizationAnimalRaceRepository::class)]
#[ApiResource(
    operations: [
        new Get(
            normalizationContext: ['groups' => ['org_animal_race_read']],
            security: "is_granted('ORG_ANIMAL_RACE_READ', object)"
        ),
        new Post(
            denormalizationContext: ['groups' => ['org_animal_race_create']],
            securityPostDenormalize: "is_granted('ORG_ANIMAL_RACE_CREATE', object)"
        ),
        new Put(
            denormalizationContext: ['groups' => ['org_animal_race_update']],
            security: "is_granted('ORG_ANIMAL_RACE_UPDATE', object)"
        ),
        new Delete(
            security: "is_granted('ORG_ANIMAL_RACE_DELETE', object)"
        )
    ]
)]
class OrganizationAnimalRace extends AnimalRace
{
    #[ORM\ManyToOne(inversedBy: 'animalRaces')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups([
        'animal_races_read',
        'org_animal_race_create',
        'org_animal_race_read'
    ])]
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
