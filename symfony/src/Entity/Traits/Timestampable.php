<?php

namespace App\Entity\Traits;

use DateTime;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use Symfony\Component\Serializer\Annotation\Groups;

trait Timestampable
{
    #[ORM\Column(type: 'datetime')]
    #[Gedmo\Timestampable(on: 'create')]
    #[Groups([
        'animals_read',
        'animal_read',
        'animal_races_read',
        'animal_sexes_read',
        'animal_tempers_read',
        'animal_types_read',
        'organization_read'
    ])]
    private DateTime $created;

    #[ORM\Column(type: 'datetime')]
    #[Gedmo\Timestampable(on: 'update')]
    #[Groups([
        'animals_read',
        'animal_read',
        'animal_races_read',
        'animal_sexes_read',
        'animal_tempers_read',
        'animal_types_read',
        'organization_read'
    ])]
    private DateTime $updated;

    public function getCreated()
    {
        return $this->created;
    }

    public function getUpdated()
    {
        return $this->updated;
    }
}