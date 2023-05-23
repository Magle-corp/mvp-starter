<?php

namespace App\Controller;

use App\Entity\AnimalAvatar;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class MediaObjectController extends AbstractController
{
    public function __invoke(Request $request): AnimalAvatar
    {
        $uploadedFile = $request->files->get('file');

        if (!$uploadedFile) {
            // TODO: pimper
            throw new BadRequestHttpException('"file" is required');
        }


        $animalAvatar = new AnimalAvatar();
        $animalAvatar->file = $uploadedFile;

        return $animalAvatar;
    }
}