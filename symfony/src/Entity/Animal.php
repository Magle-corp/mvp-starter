<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Controller\Operations\GetOrganizationAnimals;
use App\Repository\AnimalRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: AnimalRepository::class)]
#[ApiResource(
    operations: [
        new Get(
            normalizationContext: ['groups' => ['animal_read']],
            security: "is_granted('ANIMAL_READ', object)",
        ),
        new GetCollection(
            uriTemplate: '/animals/organization/{id}',
            controller: GetOrganizationAnimals::class,
            paginationEnabled: false,
            normalizationContext: ['groups' => ['animals_read']],
            security: "is_granted('ANIMALS_READ', object)"
        ),
        new Post(
            denormalizationContext: ['groups' => ['animal_write']],
            securityPostDenormalize: "is_granted('ANIMAL_CREATE', object)"
        ),
        new Put(
            denormalizationContext: ['groups' => ['animal_update']],
            security: "is_granted('ANIMAL_UPDATE', object)"
        ),
        new Delete(
            security: "is_granted('ANIMAL_DELETE', object)"
        )
    ]
)]
class Animal
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['animals_read', 'animal_read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['animals_read', 'animal_read', 'animal_write', 'animal_update'])]
    private ?string $name = null;

    #[ORM\ManyToOne(inversedBy: 'animals')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['animal_write'])]
    private ?Organization $organization = null;

    #[ORM\ManyToMany(targetEntity: AnimalTemper::class)]
    #[Groups(['animal_read', 'animal_write', 'animal_update'])]
    private Collection $tempers;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['animal_read', 'animal_write', 'animal_update'])]
    private ?AnimalRace $race = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['animal_read', 'animal_write', 'animal_update'])]
    private ?AnimalSex $sex = null;

    public function __construct()
    {
        $this->tempers = new ArrayCollection();
    }

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

    public function getOrganization(): ?Organization
    {
        return $this->organization;
    }

    public function setOrganization(?Organization $organization): self
    {
        $this->organization = $organization;

        return $this;
    }

    /**
     * @return Collection<int, AnimalTemper>
     */
    public function getTempers(): Collection
    {
        return $this->tempers;
    }

    public function addTemper(AnimalTemper $temper): self
    {
        if (!$this->tempers->contains($temper)) {
            $this->tempers->add($temper);
        }

        return $this;
    }

    public function removeTemper(AnimalTemper $temper): self
    {
        $this->tempers->removeElement($temper);

        return $this;
    }

    public function getRace(): ?AnimalRace
    {
        return $this->race;
    }

    public function setRace(?AnimalRace $race): self
    {
        $this->race = $race;

        return $this;
    }

    public function getSex(): ?AnimalSex
    {
        return $this->sex;
    }

    public function setSex(?AnimalSex $sex): self
    {
        $this->sex = $sex;

        return $this;
    }
}
