<?php

namespace App\Controller\Operations;

use App\Entity\AdminAnimalRace;
use App\Entity\OrganizationAnimalRace;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

/*
 * Custom controller for route /animal_races/organization/{id}
 * The "id" parameter is interpreted as the id of the organization
 * from which we want to retrieve the types of the animals
 */

class GetOrganizationAndAdminRaces extends AbstractController
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
        $adminAnimalRaceRepository = $this->manager->getRepository(AdminAnimalRace::class);
        $adminAnimalRaces = $adminAnimalRaceRepository->findAll();

        $organizationAnimalRaceRepository = $this->manager->getRepository(OrganizationAnimalRace::class);
        $organizationAnimalRaces = $organizationAnimalRaceRepository->findBy(['organization' => $id]);

        $allAnimalRaces = array_merge($organizationAnimalRaces, $adminAnimalRaces);

        usort($allAnimalRaces, function ($a, $b): int
        {
            return strcmp($a->getName(), $b->getName());
        });

        return $allAnimalRaces;
    }
}