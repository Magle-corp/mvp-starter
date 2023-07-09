<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Entity\Traits\Timestampable;
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
    use Timestampable;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups([
        'organization_read',
        'animal_read',
        'animal_tempers_read',
        'animal_types_read',
        'animal_races_read',
        'org_animal_type_read',
        'org_animal_temper_read',
        'org_animal_race_read',
    ])]
    private ?int $id = null;

    #[ORM\Column(length: 100)]
    #[Groups([
        'organization_read',
        'organization_create',
        'organization_update'
    ])]
    private ?string $name = null;

    #[ORM\ManyToOne(inversedBy: 'organizations')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups([
        'organization_read',
        'organization_create'
    ])]
    private ?User $owner = null;

    #[ORM\OneToMany(mappedBy: 'organization', targetEntity: Animal::class, orphanRemoval: true)]
    private Collection $animals;

    #[ORM\OneToMany(mappedBy: 'organization', targetEntity: OrganizationAnimalTemper::class, orphanRemoval: true)]
    private Collection $animalTempers;

    #[ORM\OneToMany(mappedBy: 'organization', targetEntity: OrganizationAnimalType::class, orphanRemoval: true)]
    private Collection $animalTypes;

    #[ORM\OneToMany(mappedBy: 'organization', targetEntity: OrganizationAnimalRace::class, orphanRemoval: true)]
    private Collection $animalRaces;

    #[ORM\Column]
    #[Groups([
        'organization_read',
        'organization_update'
    ])]
    private ?bool $public = false;

    #[ORM\OneToOne(mappedBy: 'organization', cascade: ['persist', 'remove'])]
    private ?OrganizationAvatar $avatar = null;

    #[ORM\Column(length: 150, nullable: true)]
    #[Groups([
        'organization_read',
        'organization_create',
        'organization_update'
    ])]
    private ?string $address = null;

    #[ORM\Column(length: 50, nullable: true)]
    #[Groups([
        'organization_read',
        'organization_create',
        'organization_update'
    ])]
    private ?string $city = null;

    #[ORM\Column(length: 5, nullable: true)]
    #[Groups([
        'organization_read',
        'organization_create',
        'organization_update'
    ])]
    private ?string $zipCode = null;

    #[ORM\Column(length: 10, nullable: true)]
    #[Groups([
        'organization_read',
        'organization_create',
        'organization_update'
    ])]
    private ?string $phone = null;

    #[ORM\Column(length: 100, nullable: true)]
    #[Groups([
        'organization_read',
        'organization_create',
        'organization_update'
    ])]
    private ?string $email = null;

    public function __construct()
    {
        $this->animals = new ArrayCollection();
        $this->animalTempers = new ArrayCollection();
        $this->animalTypes = new ArrayCollection();
        $this->animalRaces = new ArrayCollection();
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

    /**
     * @return Collection<int, OrganizationAnimalRace>
     */
    public function getAnimalRaces(): Collection
    {
        return $this->animalRaces;
    }

    public function addAnimalRace(OrganizationAnimalRace $animalRace): self
    {
        if (!$this->animalRaces->contains($animalRace)) {
            $this->animalRaces->add($animalRace);
            $animalRace->setOrganization($this);
        }

        return $this;
    }

    public function removeAnimalRace(OrganizationAnimalRace $animalRace): self
    {
        if ($this->animalRaces->removeElement($animalRace)) {
            // set the owning side to null (unless already changed)
            if ($animalRace->getOrganization() === $this) {
                $animalRace->setOrganization(null);
            }
        }

        return $this;
    }

    public function isPublic(): ?bool
    {
        return $this->public;
    }

    public function setPublic(bool $public): self
    {
        $this->public = $public;

        return $this;
    }

    public function getAvatar(): ?OrganizationAvatar
    {
        return $this->avatar;
    }

    public function setAvatar(OrganizationAvatar $avatar): self
    {
        // set the owning side of the relation if necessary
        if ($avatar->getOrganization() !== $this) {
            $avatar->setOrganization($this);
        }

        $this->avatar = $avatar;

        return $this;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(?string $address): self
    {
        $this->address = $address;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(?string $city): self
    {
        $this->city = $city;

        return $this;
    }

    public function getZipCode(): ?string
    {
        return $this->zipCode;
    }

    public function setZipCode(?string $zipCode): self
    {
        $this->zipCode = $zipCode;

        return $this;
    }

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone(?string $phone): self
    {
        $this->phone = $phone;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(?string $email): self
    {
        $this->email = $email;

        return $this;
    }
}
