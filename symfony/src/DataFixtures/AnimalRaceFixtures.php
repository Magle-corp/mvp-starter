<?php

namespace App\DataFixtures;

use App\Entity\AdminAnimalRace;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class AnimalRaceFixtures extends AbstractFixtures implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $catRaces = [
            "Persan",
            "Maine Coon",
            "Siames",
            "Siamois",
            "British",
            "Abyssin",
            "Devon Rex",
            "Scottish Fold",
            "Chartreux",
            "Sphynx",
            "Bengal",
            "Chausie",
            "Cornish Rex",
            "Exotic Shorthair",
            "Ocicat",
            "American Shorthair",
            "Manx",
            "Peterbald",
            "Selkirk Rex",
            "Singapura"
        ];

        $dogRaces = [
            "Berger allemand",
            "Bulldog",
            "Boxer",
            "Caniche",
            "Carlin",
            "Chihuahua",
            "Cocker spaniel",
            "Doberman",
            "Epagneul",
            "Golden retriever",
            "Husky",
            "Labrador",
            "Lévrier",
            "Malamute",
            "Mastiff",
            "Rottweiler",
            "Saint-Bernard",
            "Shar Pei",
            "Shih Tzu",
            "Spitz",
            "Staffordshire bull terrier",
            "Teckel",
            "Terre-neuve"
        ];

        foreach ($catRaces as $index => $race) {
            $animalRace = new AdminAnimalRace();
            $animalRace->setName($race);
            $animalRace->setType($this->getReference(AnimalTypeFixtures::REF_CAT));

            $manager->persist($animalRace);

            $this->setReference(AnimalTypeFixtures::REF_CAT . '_' . $index, $animalRace);
        }

        foreach ($dogRaces as $index => $race) {
            $animalRace = new AdminAnimalRace();
            $animalRace->setName($race);
            $animalRace->setType($this->getReference(AnimalTypeFixtures::REF_DOG));

            $manager->persist($animalRace);

            $this->setReference(AnimalTypeFixtures::REF_DOG . '_' . $index, $animalRace);
        }

        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [
            AnimalTypeFixtures::class
        ];
    }
}