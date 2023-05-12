<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Post;
use App\Repository\OrganizationAnimalRaceRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: OrganizationAnimalRaceRepository::class)]
#[ApiResource(
    operations: [
        new Post(
            denormalizationContext: ['groups' => ['org_animal_race_write']],
            securityPostDenormalize: "is_granted('ORG_ANIMAL_RACE_CREATE', object)"
        )
    ]
)]
class OrganizationAnimalRace extends AnimalRace
{
    #[ORM\ManyToOne(inversedBy: 'animalRaces')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['org_animal_race_write', 'animal_races_read'])]
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
