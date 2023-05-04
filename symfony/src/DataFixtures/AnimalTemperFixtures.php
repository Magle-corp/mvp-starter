<?php

namespace App\DataFixtures;

use App\Entity\AdminAnimalTemper;
use Doctrine\Persistence\ObjectManager;

class AnimalTemperFixtures extends AbstractFixtures
{
    public const REF_TEMPER = self::class;

    public function load(ObjectManager $manager): void
    {
//        $animalTempers = ["Calme", "Agité", "Timide", "Confiant", "Amical", "Craintif", "Dominant", "Soumis", "Curieux", "Joueur"];
//
//        foreach ($animalTempers as $index => $temper) {
//            $animalTemper = new AdminAnimalTemper();
//            $animalTemper->setName($temper);
//
//            $manager->persist($animalTemper);
//
//            $this->setReference(self::REF_TEMPER . '_' . $index, $animalTemper);
//        }
//
//        $manager->flush();
    }
}