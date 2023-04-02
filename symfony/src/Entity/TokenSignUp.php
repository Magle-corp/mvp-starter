<?php

namespace App\Entity;

use App\Repository\TokenSignUpRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: TokenSignUpRepository::class)]
class TokenSignUp
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $signUpToken = null;

    #[ORM\Column(length: 255)]
    private ?string $username = null;

    #[ORM\Column]
    private ?bool $used = false;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getSignUpToken(): ?string
    {
        return $this->signUpToken;
    }

    public function setSignUpToken(string $signUpToken): self
    {
        $this->signUpToken = $signUpToken;

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
