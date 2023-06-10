<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use App\Controller\Operations\GetOrganizationAndAdminRaces;
use App\Entity\Traits\Timestampable;
use App\Repository\AnimalRaceRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: AnimalRaceRepository::class)]
#[ORM\InheritanceType('JOINED')]
#[ORM\DiscriminatorColumn(name: 'discr', type: 'string')]
#[ORM\DiscriminatorMap([
    'admin_animal_race' => AdminAnimalRace::class,
    'organization_animal_race' => OrganizationAnimalRace::class
])]
#[ApiResource(
    operations: [
        new GetCollection(
            uriTemplate: '/animal_races/organization/{id}',
            controller: GetOrganizationAndAdminRaces::class,
            paginationEnabled: false,
            normalizationContext: ['groups' => ['animal_races_read']],
            security: "is_granted('ANIMAL_RACES_READ', object)"
        )
    ]
)]
class AnimalRace
{
    use Timestampable;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups([
        'animals_read',
        'animal_read',
        'animal_races_read',
        'org_animal_race_read'
    ])]
    private ?int $id = null;

    #[ORM\Column(length: 50)]
    #[Groups([
        'animals_read',
        'animal_read',
        'animal_races_read',
        'org_animal_race_read',
        'org_animal_race_create',
        'org_animal_race_update',
    ])]
    private ?string $name = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups([
        'animals_read',
        'animal_read',
        'animal_races_read',
        'org_animal_race_read',
        'org_animal_race_create',
        'org_animal_race_update',
        'animal_documents_read'
    ])]
    private ?AnimalType $type = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getType(): ?AnimalType
    {
        return $this->type;
    }

    public function setType(?AnimalType $type): self
    {
        $this->type = $type;

        return $this;
    }
}
