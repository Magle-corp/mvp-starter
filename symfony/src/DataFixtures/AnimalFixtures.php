<?php

namespace App\DataFixtures;

use App\Entity\Animal;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class AnimalFixtures extends AbstractFixtures implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
//        for ($i = 0; $i < 40; $i++) {
//            $animal = new Animal();
//
//            $animal->setOrganization($this->getReference(OrganizationFixtures::REF_ORGANIZATION . '_' . $this->faker->numberBetween(0, 4)));
//
//            $animalRaceFixturesRef = [
//                AnimalTypeFixtures::REF_CAT . '_' . $this->faker->numberBetween(0, 19),
//                AnimalTypeFixtures::REF_DOG . '_' . $this->faker->numberBetween(0, 22)
//            ];
//
//            $animal->setRace($this->getReference($animalRaceFixturesRef[$this->faker->numberBetween(0, count($animalRaceFixturesRef) - 1)]));
//            $animal->setName($this->faker->firstName());
//            $animal->setSex($this->getReference(AnimalSexFixtures::REF_SEX . '_' . $this->faker->numberBetween(0, 2)));
//
//            for ($o = 0; $o < $this->faker->numberBetween(1, 5); $o++) {
//                $animal->addTemper($this->getReference(AnimalTemperFixtures::REF_TEMPER . '_' . $this->faker->numberBetween(0, 9)));
//            }
//
//            $manager->persist($animal);
//        }
//
//        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [
            AnimalRaceFixtures::class,
            AnimalTypeFixtures::class,
            OrganizationFixtures::class
        ];
    }
}