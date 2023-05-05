<?php

namespace App\Entity;

use App\Repository\AdminAnimalTypeRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: AdminAnimalTypeRepository::class)]
class AdminAnimalType extends AnimalType
{
}
