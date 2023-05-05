<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use App\Controller\Operations\GetOrganizationAndAdminTypes;
use App\Repository\AnimalTypeRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: AnimalTypeRepository::class)]
#[ORM\InheritanceType('JOINED')]
#[ORM\DiscriminatorColumn(name: 'discr', type: 'string')]
#[ORM\DiscriminatorMap([
    'admin_animal_type' => AdminAnimalType::class,
    'organization_animal_type' => OrganizationAnimalType::class
])]
#[ApiResource(
    operations: [
        new GetCollection(
            uriTemplate: '/animal_types/organization/{id}',
            controller: GetOrganizationAndAdminTypes::class,
            paginationEnabled: false,
            normalizationContext: ['groups' => ['animal_types_read']],
            security: "is_granted('ANIMAL_TYPES_READ', object)"
        )
    ]
)]
class AnimalType
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['animal_types_read'])]
    private ?int $id = null;

    #[ORM\Column(length: 50)]
    #[Groups(['animal_types_read', 'org_animal_type_write'])]
    private ?string $name = null;

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
}
