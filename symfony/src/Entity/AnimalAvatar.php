<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Post;
use App\Controller\MediaObjectController;
use App\Entity\Traits\MediaObject;
use App\Repository\AnimalAvatarRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

#[Vich\Uploadable]
#[ORM\Entity(repositoryClass: AnimalAvatarRepository::class)]
#[ApiResource(
    operations: [
        new Post(
            controller: MediaObjectController::class,
            validationContext: ['groups' => ['Default', 'animal_avatar_create']],
            deserialize: false,
        ),
        new Delete(
            security: "is_granted('ANIMAL_AVATAR_DELETE', object)"
        )
    ],
    normalizationContext: ['groups' => ['animal_avatar_read']],
)]
class AnimalAvatar
{
    use MediaObject;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups([
        'animal_avatar_read',
        'animals_read',
        'animal_read'
    ])]
    private ?int $id = null;

    #[ORM\OneToOne(inversedBy: 'avatar')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Animal $animal = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAnimal(): ?Animal
    {
        return $this->animal;
    }

    public function setAnimal(Animal $animal): self
    {
        $this->animal = $animal;

        return $this;
    }
}
