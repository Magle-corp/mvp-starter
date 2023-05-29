<?php

namespace App\Controller;

use App\Entity\Animal;
use App\Entity\AnimalAvatar;
use App\Enum\Medias;
use App\Service\VoterService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class MediaObjectController extends AbstractController
{
    public function __invoke(Request $request, EntityManagerInterface $entityManager, VoterService $voterService): AnimalAvatar
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

        if ($relatedEntity->getAvatar()) {
            $currentAvatar = $relatedEntity->getAvatar();
            $entityManager->remove($currentAvatar);
            $entityManager->flush();
            $entityManager->refresh($relatedEntity);
        }

        return $this->createFileEntity($relatedEntity, $uploadedFile);
    }

    public function getRelatedEntity(array $entity, EntityManagerInterface $entityManager): ?Animal
    {
        switch ($entity['type']) {
            case Medias::ANIMAL_AVATAR:
                $animalRepository = $entityManager->getRepository(Animal::class);
                return $animalRepository->find($entity['id']);
            default:
                return null;
        }
    }

    public function createFileEntity(mixed $relatedEntity, mixed $file): ?AnimalAvatar
    {
        if ($relatedEntity instanceof Animal) {
            $animalAvatar = new AnimalAvatar();
            $animalAvatar->file = $file;
            $animalAvatar->setAnimal($relatedEntity);
            return $animalAvatar;
        }

        return null;
    }
}