<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\OrganizationRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: OrganizationRepository::class)]
#[ApiResource(
    operations: [
        new Get(
            normalizationContext: ['groups' => ['organization_read']],
            security: "is_granted('ORGANIZATION_READ', object)"
        ),
        new Post(
            denormalizationContext: ['groups' => ['organization_create']],
            securityPostDenormalize: "is_granted('ORGANIZATION_CREATE', object)"
        ),
        new Put(
            denormalizationContext: ['groups' => ['organization_update']],
            security: "is_granted('ORGANIZATION_UPDATE', object)"
        ),
        new Delete(
            security: "is_granted('ORGANIZATION_DELETE', object)"
        )
    ]
)]
class Organization
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['organization_read'])]
    private ?int $id = null;

    #[ORM\Column(length: 100)]
    #[Groups(['organization_read', 'organization_create', 'organization_update'])]
    private ?string $name = null;

    #[ORM\ManyToOne(inversedBy: 'organizations')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['organization_create'])]
    private ?User $owner = null;

    #[ORM\OneToMany(mappedBy: 'organization', targetEntity: Animal::class, orphanRemoval: true)]
    private Collection $animals;

    #[ORM\OneToMany(mappedBy: 'organization', targetEntity: OrganizationAnimalTemper::class, orphanRemoval: true)]
    private Collection $animalTempers;

    #[ORM\OneToMany(mappedBy: 'organization', targetEntity: OrganizationAnimalType::class, orphanRemoval: true)]
    private Collection $animalTypes;

    public function __construct()
    {
        $this->animals = new ArrayCollection();
        $this->animalTempers = new ArrayCollection();
        $this->animalTypes = new ArrayCollection();
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

    public function getOwner(): ?User
    {
        return $this->owner;
    }

    public function setOwner(?User $owner): self
    {
        $this->owner = $owner;

        return $this;
    }

    /**
     * @return Collection<int, Animal>
     */
    public function getAnimals(): Collection
    {
        return $this->animals;
    }

    public function addAnimal(Animal $animal): self
    {
        if (!$this->animals->contains($animal)) {
            $this->animals->add($animal);
            $animal->setOrganization($this);
        }

        return $this;
    }

    public function removeAnimal(Animal $animal): self
    {
        if ($this->animals->removeElement($animal)) {
            // set the owning side to null (unless already changed)
            if ($animal->getOrganization() === $this) {
                $animal->setOrganization(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, OrganizationAnimalTemper>
     */
    public function getAnimalTempers(): Collection
    {
        return $this->animalTempers;
    }

    public function addAnimalTemper(OrganizationAnimalTemper $animalTemper): self
    {
        if (!$this->animalTempers->contains($animalTemper)) {
            $this->animalTempers->add($animalTemper);
            $animalTemper->setOrganization($this);
        }

        return $this;
    }

    public function removeAnimalTemper(OrganizationAnimalTemper $animalTemper): self
    {
        if ($this->animalTempers->removeElement($animalTemper)) {
            // set the owning side to null (unless already changed)
            if ($animalTemper->getOrganization() === $this) {
                $animalTemper->setOrganization(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, OrganizationAnimalType>
     */
    public function getAnimalTypes(): Collection
    {
        return $this->animalTypes;
    }

    public function addAnimalType(OrganizationAnimalType $animalType): self
    {
        if (!$this->animalTypes->contains($animalType)) {
            $this->animalTypes->add($animalType);
            $animalType->setOrganization($this);
        }

        return $this;
    }

    public function removeAnimalType(OrganizationAnimalType $animalType): self
    {
        if ($this->animalTypes->removeElement($animalType)) {
            // set the owning side to null (unless already changed)
            if ($animalType->getOrganization() === $this) {
                $animalType->setOrganization(null);
            }
        }

        return $this;
    }
}
