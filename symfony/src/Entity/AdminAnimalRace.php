<?php

namespace App\Entity;

use App\Repository\AdminAnimalRaceRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: AdminAnimalRaceRepository::class)]
class AdminAnimalRace extends AnimalRace
{
}
