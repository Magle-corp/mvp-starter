<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Post;
use App\Controller\MediaObjectController;
use App\Entity\Traits\MediaObject;
use App\Repository\AnimalDocumentRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

#[Vich\Uploadable]
#[ORM\Entity(repositoryClass: AnimalDocumentRepository::class)]
#[ApiResource(
    operations: [
        new Post(
            controller: MediaObjectController::class,
            validationContext: ['groups' => ['Default', 'animal_document_create']],
            deserialize: false
        ),
        new Delete(
            security: "is_granted('ANIMAL_AVATAR_DELETE', object)"
        )
    ],
    normalizationContext: ['groups' => ['animal_document_read']],
)]
class AnimalDocument
{
    use MediaObject;
    
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups([
        'animal_document_read',
        'animal_read'
    ])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'documents')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Animal $animal = null;

    #[ORM\Column(length: 100)]
    private ?string $fileName = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAnimal(): ?Animal
    {
        return $this->animal;
    }

    public function setAnimal(?Animal $animal): self
    {
        $this->animal = $animal;

        return $this;
    }

    public function getFileName(): ?string
    {
        return $this->fileName;
    }

    public function setFileName(string $fileName): self
    {
        $this->fileName = $fileName;

        return $this;
    }
}
