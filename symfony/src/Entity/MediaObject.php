<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use App\Controller\MediaObjectController;
use App\Repository\MediaObjectRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Serializer\Annotation\Groups;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

#[Vich\Uploadable]
#[ORM\Entity(repositoryClass: MediaObjectRepository::class)]
#[ApiResource(
    operations: [
        new Get(),
        new GetCollection(),
        new Post(
            controller: MediaObjectController::class,
            validationContext: ['groups' => ['Default', 'media_objects_create']],
            deserialize: false,
        )
    ],
    normalizationContext: ['groups' => ['media_object_read']],
)]
class MediaObject
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['media_object_read'])]
    public ?string $contentUrl = null;

    #[Vich\UploadableField(mapping: 'media_object', fileNameProperty: 'filePath')]
    #[Groups(['media_objects_create'])]
    public ?File $file = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $filePath = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFilePath(): ?string
    {
        return $this->filePath;
    }

    public function setFilePath(?string $filePath): self
    {
        $this->filePath = $filePath;

        return $this;
    }
}
