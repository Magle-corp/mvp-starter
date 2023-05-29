<?php

namespace App\Entity\Traits;

use DateTime;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Serializer\Annotation\Groups;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

trait MediaObject
{
    #[ORM\Column(length: 255, nullable: true)]
    #[Groups([
        'animal_avatar_read',
        'animals_read',
        'animal_read'
    ])]
    public ?string $contentUrl = null;

    #[Vich\UploadableField(mapping: 'media_object', fileNameProperty: 'filePath')]
    #[Groups([
        'animal_avatar_create'
    ])]
    public ?File $file = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $filePath = null;

    #[ORM\Column(type: 'datetime')]
    #[Gedmo\Timestampable(on: 'create')]
    #[Groups([
        'animal_avatar_read',
        'animals_read',
        'animal_read'
    ])]
    private DateTime $created;

    public function getFilePath(): ?string
    {
        return $this->filePath;
    }

    public function setFilePath(?string $filePath): self
    {
        $this->filePath = $filePath;

        return $this;
    }

    public function getCreated()
    {
        return $this->created;
    }
}