<?php

namespace App\Controller\Operations;

use App\Entity\Animal;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

/*
 * Custom controller for route /animals/organization/{id}
 * The "id" parameter is interpreted as the id of the organization
 * whose animals we want to collect.
 */
class GetOrganizationAnimals extends AbstractController
{
    private EntityManagerInterface $manager;

    public function __construct(
        EntityManagerInterface $manager,
    )
    {
        $this->manager = $manager;
    }

    public function __invoke(string $id): array
    {
        $animalRepository = $this->manager->getRepository(Animal::class);
        $animals = $animalRepository->findBy(['organization' => $id]);

        usort($animals, function ($a, $b): int
        {
            return strcmp($a->getName(), $b->getName());
        });

        return $animals;
    }
}