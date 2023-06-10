<?php

namespace App\Controller;

use App\Entity\Animal;
use App\Entity\AnimalAvatar;
use App\Entity\AnimalDocument;
use App\Enum\Medias;
use App\Service\VoterService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class MediaObjectController extends AbstractController
{
    public function __invoke(Request $request, EntityManagerInterface $entityManager, VoterService $voterService): AnimalDocument|AnimalAvatar|null
    {
        $uploadedFile = $request->files->get('file');
        $fileInformationJson = $request->request->get('file_information');

        if (!$uploadedFile || !$fileInformationJson) {
            throw new BadRequestHttpException();
        }

        $fileInformation = json_decode($fileInformationJson, true);

        if (!array_key_exists('related_entity_id', $fileInformation) || !array_key_exists('file_entity_type', $fileInformation)) {
            throw new BadRequestHttpException();
        }

        $fileRelatedEntity = $this->getRelatedEntity($fileInformation, $entityManager);

        if (!$fileRelatedEntity || !$voterService->userHasOrganization($this->getUser(), $fileRelatedEntity->getOrganization()->getId())) {
            throw new BadRequestHttpException();
        }

        if ($fileInformation['file_entity_type'] === Medias::ANIMAL_AVATAR && $fileRelatedEntity->getAvatar()) {
            $this->removeCurrentAvatar($fileRelatedEntity, $entityManager);
        }

        return $this->createFileEntity($fileInformation, $fileRelatedEntity, $uploadedFile);
    }

    public function getRelatedEntity(array $fileInformation, EntityManagerInterface $entityManager): ?Animal
    {
        if ($fileInformation['file_entity_type'] === Medias::ANIMAL_AVATAR || $fileInformation['file_entity_type'] === Medias::ANIMAL_DOCUMENT) {
            $animalRepository = $entityManager->getRepository(Animal::class);
            return $animalRepository->find($fileInformation['related_entity_id']);
        } else {
            return null;
        }
    }

    public function removeCurrentAvatar(mixed $fileRelatedEntity, EntityManagerInterface $entityManager): void
    {
        $currentAvatar = $fileRelatedEntity->getAvatar();
        $entityManager->remove($currentAvatar);
        $entityManager->flush();
        $entityManager->refresh($fileRelatedEntity);
    }

    public function createFileEntity(array $fileInformation, mixed $fileRelatedEntity, UploadedFile $uploadedFile): AnimalDocument|AnimalAvatar|null
    {
        if ($fileInformation['file_entity_type'] === Medias::ANIMAL_AVATAR) {
            $animalAvatar = new AnimalAvatar();
            $animalAvatar->file = $uploadedFile;
            $animalAvatar->setAnimal($fileRelatedEntity);
            return $animalAvatar;
        }

        if ($fileInformation['file_entity_type'] === Medias::ANIMAL_DOCUMENT) {
            if (!array_key_exists('file_name', $fileInformation)) {
                throw new BadRequestHttpException();
            }

            $animalDocument = new AnimalDocument();
            $animalDocument->file = $uploadedFile;
            $animalDocument->setAnimal($fileRelatedEntity);
            $animalDocument->setFileName($fileInformation['file_name']);
            $animalDocument->setFileExtension($uploadedFile->guessExtension());

            return $animalDocument;
        }

        return null;
    }
}