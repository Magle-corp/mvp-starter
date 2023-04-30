<?php

namespace App\Controller\profile;

use App\Service\ResponseService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

#[AsController]
class UpdatePasswordController extends AbstractController
{
    private ResponseService $responseService;
    private UserPasswordHasherInterface $passwordHasher;
    private EntityManagerInterface $entityManager;

    public function __construct(
        private readonly Security   $security,
        ResponseService             $responseService,
        UserPasswordHasherInterface $passwordHasher,
        EntityManagerInterface      $entityManager,
    )
    {
        $this->responseService = $responseService;
        $this->passwordHasher = $passwordHasher;
        $this->entityManager = $entityManager;
    }

    public function __invoke(Request $request): Response
    {
        $user = $this->security->getUser();
        $requestContent = json_decode($request->getContent(), true);

        if (!array_key_exists('oldPassword', $requestContent) || !array_key_exists('newPassword', $requestContent)) {
            return $this->responseService->error();
        }

        $oldPassword = $requestContent['oldPassword'];
        $newPassword = $requestContent['newPassword'];

        if (!$this->passwordHasher->isPasswordValid($user, $oldPassword)) {
            return $this->responseService->create("L'ancien mot de passe n'est pas valide", 422);
        }

        $user->setPassword($this->passwordHasher->hashPassword($user, $newPassword));
        $this->entityManager->persist($user);

        $this->entityManager->flush();

        return $this->responseService->create('OK', 200);
    }
}