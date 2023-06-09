<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Controller\Operations\GetOrganizationAnimals;
use App\Entity\Traits\Timestampable;
use App\Repository\AnimalRepository;
use DateTimeInterface;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
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
            denormalizationContext: ['groups' => ['animal_create']],
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
    use Timestampable;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups([
        'animals_read',
        'animal_read'
    ])]
    private ?int $id = null;

    #[ORM\Column(length: 50)]
    #[Groups([
        'animals_read',
        'animal_read',
        'animal_create',
        'animal_update',
        'animal_documents_read'
    ])]
    private ?string $name = null;

    #[ORM\ManyToOne(inversedBy: 'animals')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups([
        'animal_read',
        'animal_create',
    ])]
    private ?Organization $organization = null;

    #[ORM\ManyToMany(targetEntity: AnimalTemper::class)]
    #[Groups([
        'animal_read',
        'animal_create',
        'animal_update'
    ])]
    private Collection $tempers;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups([
        'animals_read',
        'animal_read',
        'animal_create',
        'animal_update',
        'animal_documents_read'
    ])]
    private ?AnimalRace $race = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups([
        'animals_read',
        'animal_read',
        'animal_create',
        'animal_update'
    ])]
    private ?AnimalSex $sex = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups([
        'animals_read',
        'animal_read',
        'animal_create',
        'animal_update'
    ])]
    private ?DateTimeInterface $registered = null;

    #[ORM\OneToOne(mappedBy: 'animal', cascade: ['persist', 'remove'])]
    #[Groups([
        'animals_read',
        'animal_read',
    ])]
    private ?AnimalAvatar $avatar = null;

    #[ORM\OneToMany(mappedBy: 'animal', targetEntity: AnimalDocument::class, orphanRemoval: true)]
    #[Groups([
        'animal_read',
    ])]
    private Collection $documents;

    #[ORM\Column]
    #[Groups([
        'animals_read',
        'animal_read',
        'animal_create',
        'animal_update'
    ])]
    private ?bool $public = false;

    public function __construct()
    {
        $this->tempers = new ArrayCollection();
        $this->documents = new ArrayCollection();
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

    public function getRegistered(): ?DateTimeInterface
    {
        return $this->registered;
    }

    public function setRegistered(DateTimeInterface $registered): self
    {
        $this->registered = $registered;

        return $this;
    }

    public function getAvatar(): ?AnimalAvatar
    {
        return $this->avatar;
    }

    public function setAvatar(AnimalAvatar $avatar): self
    {
        // set the owning side of the relation if necessary
        if ($avatar->getAnimal() !== $this) {
            $avatar->setAnimal($this);
        }

        $this->avatar = $avatar;

        return $this;
    }

    /**
     * @return Collection<int, AnimalDocument>
     */
    public function getDocuments(): Collection
    {
        return $this->documents;
    }

    public function addDocument(AnimalDocument $document): self
    {
        if (!$this->documents->contains($document)) {
            $this->documents->add($document);
            $document->setAnimal($this);
        }

        return $this;
    }

    public function removeDocument(AnimalDocument $document): self
    {
        if ($this->documents->removeElement($document)) {
            // set the owning side to null (unless already changed)
            if ($document->getAnimal() === $this) {
                $document->setAnimal(null);
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
}
