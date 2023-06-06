<?php

namespace App\Controller;

use App\Entity\Animal;
use App\Entity\AnimalAvatar;
use App\Entity\AnimalDocument;
use App\Enum\Medias;
use App\Service\VoterService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class MediaObjectController extends AbstractController
{
    public function __invoke(Request $request, EntityManagerInterface $entityManager, VoterService $voterService): AnimalDocument|AnimalAvatar|null
    {
        $uploadedFile = $request->files->get('file');
        $relatedEntityJsonData = $request->request->get('entity');

        if (!$uploadedFile || !$relatedEntityJsonData) {
            // TODO: add message or handle error
            throw new BadRequestHttpException();
        }

        $relatedEntityData = json_decode($relatedEntityJsonData, true);

        if (!array_key_exists('id', $relatedEntityData) || !array_key_exists('type', $relatedEntityData)) {
            // TODO: add message or handle error
            throw new BadRequestHttpException();
        }

        $relatedEntity = $this->getRelatedEntity($relatedEntityData, $entityManager);

        if (!$relatedEntity || !$voterService->userHasOrganization($this->getUser(), $relatedEntity->getOrganization()->getId())) {
            // TODO: add message or handle error
            throw new BadRequestHttpException();
        }

        if ($relatedEntityData['type'] === Medias::ANIMAL_AVATAR && $relatedEntity->getAvatar()) {
            $currentAvatar = $relatedEntity->getAvatar();
            $entityManager->remove($currentAvatar);
            $entityManager->flush();
            $entityManager->refresh($relatedEntity);
        }

        return $this->createFileEntity($relatedEntityData, $relatedEntity, $uploadedFile);
    }

    public function getRelatedEntity(array $entityData, EntityManagerInterface $entityManager): ?Animal
    {
        if ($entityData['type'] === Medias::ANIMAL_AVATAR || $entityData['type'] === Medias::ANIMAL_DOCUMENT) {
            $animalRepository = $entityManager->getRepository(Animal::class);
            return $animalRepository->find($entityData['id']);
        } else {
            return null;
        }
    }

    public function createFileEntity(array $entityData, mixed $relatedEntity, mixed $file): AnimalDocument|AnimalAvatar|null
    {
        if ($entityData['type'] === Medias::ANIMAL_AVATAR) {
            $animalAvatar = new AnimalAvatar();
            $animalAvatar->file = $file;
            $animalAvatar->setAnimal($relatedEntity);
            return $animalAvatar;
        }

        if ($entityData['type'] === Medias::ANIMAL_DOCUMENT) {
            $animalDocument = new AnimalDocument();
            $animalDocument->file = $file;
            $animalDocument->setAnimal($relatedEntity);
            return $animalDocument;
        }

        return null;
    }
}