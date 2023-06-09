<?php

namespace App\AppBundle\VichUploader;

use Vich\UploaderBundle\Mapping\PropertyMapping;
use Vich\UploaderBundle\Naming\NamerInterface;
use Vich\UploaderBundle\Naming\Polyfill\FileExtensionTrait;

class DocumentNamer implements NamerInterface
{
    use FileExtensionTrait;

    public function name(object $object, PropertyMapping $mapping): string
    {
        $file = $mapping->getFile($object);

        if (method_exists($object, 'getFileName')) {
            $fileName = $this->clearFileName($object->getFileName());
            $fileName = $fileName . '_' . uniqid();

            if ($extension = $this->getExtension($file)) {
                $fileName = sprintf('%s.%s', $fileName, $extension);
            }

            return $fileName;
        }

        return $file->getClientOriginalName();
    }

    public function clearFileName($string): string
    {
        $charactersToReplace = [",", ".", "/", "@", "^", "¨", "'", "\"", "²", ";", " "];

        foreach ($charactersToReplace as $character) {
            $string = str_replace($character, "_", $string);
        }

        return $string;
    }
}