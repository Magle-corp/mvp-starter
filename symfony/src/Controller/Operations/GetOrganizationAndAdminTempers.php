<?php

namespace App\Controller\Operations;

use App\Entity\AdminAnimalTemper;
use App\Entity\OrganizationAnimalTemper;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

/*
 * Custom controller for route /animal_tempers/organization/{id}
 * The "id" parameter is interpreted as the id of the organization
 * from which we want to retrieve the characters of the animals
 */
class GetOrganizationAndAdminTempers extends AbstractController
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
        $adminAnimalTemperRepository = $this->manager->getRepository(AdminAnimalTemper::class);
        $adminAnimalTempers = $adminAnimalTemperRepository->findAll();

        $organizationAnimalTemperRepository = $this->manager->getRepository(OrganizationAnimalTemper::class);
        $organizationAnimalTempers = $organizationAnimalTemperRepository->findBy(['organization' => $id]);

        return array_merge($organizationAnimalTempers, $adminAnimalTempers);
    }
}