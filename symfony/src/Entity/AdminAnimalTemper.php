<?php

namespace App\Entity;

use App\Repository\AdminAnimalTemperRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: AdminAnimalTemperRepository::class)]
class AdminAnimalTemper extends AnimalTemper
{
}
