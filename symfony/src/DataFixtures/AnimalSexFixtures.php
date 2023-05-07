<?php

namespace App\DataFixtures;

use App\Entity\AnimalSex;
use Doctrine\Persistence\ObjectManager;

class AnimalSexFixtures extends AbstractFixtures
{
    public const REF_SEX = self::class;

    public function load(ObjectManager $manager): void
    {
        $animalSexes = [
            'Male',
            'Femelle',
            'Inconu'
        ];

        foreach ($animalSexes as $index => $sex) {
            $animalSex = new AnimalSex();
            $animalSex->setName($sex);

            $manager->persist($animalSex);

            $this->setReference(self::REF_SEX . '_' . $index, $animalSex);
        }

        $manager->flush();
    }
}