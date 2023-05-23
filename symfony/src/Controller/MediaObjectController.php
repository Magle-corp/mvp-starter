<?php

namespace App\Controller;

use App\Entity\AnimalPicture;
use App\Entity\MediaObject;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class MediaObjectController extends AbstractController
{
    public function __invoke(Request $request): AnimalPicture
    {
        $x = $request->request->get('animal');
        dump($x);
        dd(json_decode($x, true));

        $uploadedFile = $request->files->get('file');
        if (!$uploadedFile) {
            throw new BadRequestHttpException('"file" is required');
        }

        $mediaObject = new AnimalPicture();
        $mediaObject->file = $uploadedFile;

        return $mediaObject;
    }
}