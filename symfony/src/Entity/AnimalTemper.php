<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use App\Controller\Operations\GetOrganizationAndAdminTempers;
use App\Entity\Traits\Timestampable;
use App\Repository\AnimalTemperRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: AnimalTemperRepository::class)]
#[ORM\InheritanceType('JOINED')]
#[ORM\DiscriminatorColumn(name: 'discr', type: 'string')]
#[ORM\DiscriminatorMap([
    'admin_animal_temper' => AdminAnimalTemper::class,
    'organization_animal_temper' => OrganizationAnimalTemper::class
])]
#[ApiResource(
    operations: [
        new GetCollection(
            uriTemplate: '/animal_tempers/organization/{id}',
            controller: GetOrganizationAndAdminTempers::class,
            paginationEnabled: false,
            normalizationContext: ['groups' => ['animal_tempers_read']],
            security: "is_granted('ANIMAL_TEMPERS_READ', object)"
        ),
    ]
)]
class AnimalTemper
{
    use Timestampable;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups([
        'animal_read',
        'animal_tempers_read',
        'org_animal_temper_read',
    ])]
    private ?int $id = null;

    #[ORM\Column(length: 50)]
    #[Groups([
        'animal_read',
        'animal_tempers_read',
        'org_animal_temper_read',
        'org_animal_temper_create',
        'org_animal_temper_update',
    ])]
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
