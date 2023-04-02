<?php

namespace App\Entity;

use App\Repository\TokenResetPasswordRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: TokenResetPasswordRepository::class)]
class TokenResetPassword
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $resetPasswordToken = null;

    #[ORM\Column(length: 255)]
    private ?string $username = null;

    #[ORM\Column]
    private ?bool $used = false;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getResetPasswordToken(): ?string
    {
        return $this->resetPasswordToken;
    }

    public function setResetPasswordToken(string $resetPasswordToken): self
    {
        $this->resetPasswordToken = $resetPasswordToken;

        return $this;
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(string $username): self
    {
        $this->username = $username;

        return $this;
    }

    public function isUsed(): ?bool
    {
        return $this->used;
    }

    public function setUsed(bool $used): self
    {
        $this->used = $used;

        return $this;
    }
}
