<?php

namespace App\Controller\Operations;

use App\Entity\AnimalDocument;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

/*
 * Custom controller for route /animal_documents/organization/{id}
 * The "id" parameter is interpreted as the id of the organization
 * from which we want to retrieve the document of the animals
 */
class GetOrganizationAnimalDocuments extends AbstractController
{
    private EntityManagerInterface $manager;

    public function __construct(
        EntityManagerInterface $manager,
    )
    {
        $this->manager = $manager;
    }

    public function __invoke(string $id)
    {
        $animalDocumentRepository = $this->manager->getRepository(AnimalDocument::class);
        $animalDocuments = $animalDocumentRepository->findAll();
        $organizationAnimalDocuments = [];

        foreach ($animalDocuments as $animalDocument) {
            if ($animalDocument->getAnimal()->getOrganization()->getId() == $id) {
                $organizationAnimalDocuments[] = $animalDocument;
            }
        }

        return $organizationAnimalDocuments;
    }
}