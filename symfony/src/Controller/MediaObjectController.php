<?php

namespace App\Controller;

use App\Entity\Animal;
use App\Entity\AnimalAvatar;
use App\Entity\AnimalDocument;
use App\Entity\User;
use App\Entity\UserAvatar;
use App\Enum\Medias;
use App\Service\VoterService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class MediaObjectController extends AbstractController
{
    public function __invoke(Request $request, EntityManagerInterface $entityManager, VoterService $voterService): AnimalDocument|AnimalAvatar|UserAvatar|null
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

        if (!$fileRelatedEntity) {
            // TODO: add feedback msg
            throw new BadRequestHttpException();
        }

        $fileType = $fileInformation['file_entity_type'];

        if ($fileType === Medias::ANIMAL_AVATAR || $fileType === Medias::ANIMAL_DOCUMENT) {
            $userHasOrganization = $voterService->userHasOrganization($this->getUser(), $fileRelatedEntity->getOrganization()->getId());

            if (!$userHasOrganization) {
                // TODO: add feedback msg
                throw new BadRequestHttpException();
            }
        }

        if ($fileType === Medias::USER_AVATAR && $this->getUser()->getId() !== $fileRelatedEntity->getId()) {
            // TODO: add feedback msg
            throw new BadRequestHttpException();
        }

        if (($fileType === Medias::ANIMAL_AVATAR || $fileType === Medias::USER_AVATAR) && $fileRelatedEntity->getAvatar() !== null) {
            $this->removeCurrentAvatar($fileRelatedEntity, $entityManager);
        }

        return $this->createFileEntity($fileInformation, $fileRelatedEntity, $uploadedFile);
    }

    public function getRelatedEntity(array $fileInformation, EntityManagerInterface $entityManager): Animal|User|null
    {
        if ($fileInformation['file_entity_type'] === Medias::ANIMAL_AVATAR || $fileInformation['file_entity_type'] === Medias::ANIMAL_DOCUMENT) {
            $animalRepository = $entityManager->getRepository(Animal::class);
            return $animalRepository->find($fileInformation['related_entity_id']);
        }

        if ($fileInformation['file_entity_type'] === Medias::USER_AVATAR) {
            $userRepository = $entityManager->getRepository(User::class);
            return $userRepository->find($fileInformation['related_entity_id']);
        }

        return null;
    }

    public function removeCurrentAvatar(mixed $fileRelatedEntity, EntityManagerInterface $entityManager): void
    {
        $currentAvatar = $fileRelatedEntity->getAvatar();
        $entityManager->remove($currentAvatar);
        $entityManager->flush();
        $entityManager->refresh($fileRelatedEntity);
    }

    public function createFileEntity(array $fileInformation, mixed $fileRelatedEntity, UploadedFile $uploadedFile): AnimalDocument|AnimalAvatar|UserAvatar|null
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

        if ($fileInformation['file_entity_type'] === Medias::USER_AVATAR) {
            $userAvatar = new UserAvatar();
            $userAvatar->file = $uploadedFile;
            $userAvatar->setUser($fileRelatedEntity);
            return $userAvatar;
        }

        return null;
    }
}