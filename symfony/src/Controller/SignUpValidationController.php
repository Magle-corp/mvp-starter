<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class SignUpValidationController extends AbstractController
{
    public function __invoke(Request $request)
    {
        dd($request);

        return $user;
    }
}