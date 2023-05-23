<?php

namespace App\Service;

use Symfony\Component\HttpFoundation\Response;

class ResponseService
{
    public function create(string $message, int $code): Response
    {
        return new Response(
            '{"message":"' . $message . '"}',
            $code
        );
    }

    public function success(): Response
    {
        return $this->create("OK", 200);
    }

    public function forbidden(): Response
    {
        return $this->create("Vous n'avez pas les droits nécessaires pour administrer ce contenu", 403);
    }

    public function error(): Response
    {
        return $this->create('Un problème technique est survenu, veuillez réessayer ultérieurement', 500);
    }

    public function debug(string $message): Response
    {
        return $this->create($message, 500);
    }
}