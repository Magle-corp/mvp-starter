<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Post;
use App\Controller\MediaObjectController;
use App\Entity\Traits\MediaObject;
use App\Repository\UserAvatarRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

#[Vich\Uploadable]
#[ORM\Entity(repositoryClass: UserAvatarRepository::class)]
#[ApiResource(
    operations: [
        new Post(
            controller: MediaObjectController::class,
            validationContext: ['groups' => ['Default', 'user_avatar_create']],
            deserialize: false,
        ),
        new Delete(
            security: "is_granted('USER_AVATAR_DELETE', object)"
        )
    ],
    normalizationContext: ['groups' => ['user_avatar_read']],
)]
class UserAvatar
{
    use MediaObject;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups([
        'user_avatar_read'
    ])]
    private ?int $id = null;

    #[ORM\OneToOne(inversedBy: 'avatar')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(User $user): self
    {
        $this->user = $user;

        return $this;
    }
}
