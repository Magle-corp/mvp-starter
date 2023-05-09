<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Post;
use App\Controller\User\ForgotPasswordController;
use App\Controller\User\ReSendSignUpValidationEmailController;
use App\Controller\User\ResetPasswordController;
use App\Controller\User\SignUpController;
use App\Controller\User\SignUpValidationController;
use App\Controller\User\UpdatePasswordController;
use App\Entity\Traits\Timestampable;
use App\Repository\UserRepository;
use DateTime;
use DateTimeInterface;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ApiResource(operations: [
    new Post(
        uriTemplate: '/auth/signUp',
        controller: SignUpController::class,
    ),
    new Post(
        uriTemplate: '/auth/signUpValidation',
        controller: SignUpValidationController::class,
    ),
    new Post(
        uriTemplate: '/auth/reSendSignUpValidationEmail',
        controller: ReSendSignUpValidationEmailController::class,
    ),
    new Post(
        uriTemplate: '/auth/forgotPassword',
        controller: ForgotPasswordController::class,
    ),
    new Post(
        uriTemplate: '/auth/resetPassword',
        controller: ResetPasswordController::class,
    ),
    new Post(
        uriTemplate: '/profile/updatePassword',
        controller: UpdatePasswordController::class,
    )
])]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    use Timestampable;

    public function __construct()
    {
        $this->organizations = new ArrayCollection();
    }

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['organization_read'])]
    private ?int $id = null;

    #[ORM\Column(length: 180, unique: true)]
    private ?string $email = null;

    #[ORM\Column]
    private array $roles = [];

    #[ORM\Column]
    private ?string $password = null;

    #[ORM\Column]
    private ?bool $verified = false;

    #[ORM\OneToMany(mappedBy: 'owner', targetEntity: Organization::class, orphanRemoval: true)]
    private Collection $organizations;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string)$this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function isVerified(): ?bool
    {
        return $this->verified;
    }

    public function setVerified(bool $verified): self
    {
        $this->verified = $verified;

        return $this;
    }

    /**
     * @return Collection<int, Organization>
     */
    public function getOrganizations(): Collection
    {
        return $this->organizations;
    }

    public function addOrganization(Organization $organization): self
    {
        if (!$this->organizations->contains($organization)) {
            $this->organizations->add($organization);
            $organization->setOwner($this);
        }

        return $this;
    }

    public function removeOrganization(Organization $organization): self
    {
        if ($this->organizations->removeElement($organization)) {
            // set the owning side to null (unless already changed)
            if ($organization->getOwner() === $this) {
                $organization->setOwner(null);
            }
        }

        return $this;
    }
}
