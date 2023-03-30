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

    public function error(): Response
    {
        return $this->create('Un problème technique est survenu, veuillez réessayer ultérieurement', 500);
    }
}