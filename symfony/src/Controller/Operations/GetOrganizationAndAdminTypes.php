<?php

namespace App\Controller\Operations;

use App\Entity\AdminAnimalType;
use App\Entity\OrganizationAnimalType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

/*
 * Custom controller for route /animal_types/organization/{id}
 * The "id" parameter is interpreted as the id of the organization
 * from which we want to retrieve the types of the animals
 */
class GetOrganizationAndAdminTypes extends AbstractController
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
        $adminAnimalTypeRepository = $this->manager->getRepository(AdminAnimalType::class);
        $adminAnimalTypes = $adminAnimalTypeRepository->findAll();

        $organizationAnimalTypeRepository = $this->manager->getRepository(OrganizationAnimalType::class);
        $organizationAnimalTypes = $organizationAnimalTypeRepository->findBy(['organization' => $id]);

        return array_merge($organizationAnimalTypes, $adminAnimalTypes);
    }
}