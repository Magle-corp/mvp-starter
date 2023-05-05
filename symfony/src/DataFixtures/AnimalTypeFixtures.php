<?php

namespace App\DataFixtures;

use App\Entity\AdminAnimalType;
use Doctrine\Persistence\ObjectManager;

class AnimalTypeFixtures extends AbstractFixtures
{
    public const REF_CAT = self::class . 'CAT';
    public const REF_DOG = self::class . 'DOG';

    public function load(ObjectManager $manager): void
    {
        $animalTypes = [
            'Chat',
            'Chien'
        ];

        foreach ($animalTypes as $type) {
            $animalType = new AdminAnimalType();
            $animalType->setName($type);

            $manager->persist($animalType);

            if ($type === 'Chat') {
                $this->setReference(self::REF_CAT, $animalType);
            }

            if ($type === 'Chien') {
                $this->setReference(self::REF_DOG, $animalType);
            }
        }

        $manager->flush();
    }
}