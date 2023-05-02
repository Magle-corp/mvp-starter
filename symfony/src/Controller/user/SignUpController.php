<?php

namespace App\Controller\user;

use App\Entity\TokenSignUp;
use App\Entity\User;
use App\Service\EmailService;
use App\Service\JWTService;
use App\Service\ResponseService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

#[AsController]
class SignUpController extends AbstractController
{
    private EntityManagerInterface $entityManager;
    private ResponseService $responseService;
    private UserPasswordHasherInterface $passwordHasher;
    private EmailService $emailService;
    private JWTService $JWTService;

    public function __construct(
        EntityManagerInterface      $entityManager,
        ResponseService             $responseService,
        UserPasswordHasherInterface $passwordHasher,
        EmailService                $emailService,
        JWTService                  $JWTService,
    )
    {
        $this->entityManager = $entityManager;
        $this->responseService = $responseService;
        $this->passwordHasher = $passwordHasher;
        $this->emailService = $emailService;
        $this->JWTService = $JWTService;
    }

    public function __invoke(Request $request)
    {
        $requestContent = json_decode($request->getContent(), true);

        if (!array_key_exists('email', $requestContent) || !array_key_exists('password', $requestContent)) {
            return $this->responseService->error();
        }

        $userEmail = $requestContent['email'];
        $userPassword = $requestContent['password'];

        $userRepository = $this->entityManager->getRepository(User::class);
        $registeredUser = $userRepository->findOneBy(['email' => $userEmail]);

        if ($registeredUser) {
            return $this->responseService->create('Adresse email déjà enregistrée', 409);
        }

        $newUser = new User();
        $newUser->setEmail($userEmail);
        $newUser->setPassword($this->passwordHasher->hashPassword($newUser, $userPassword));
        $this->entityManager->persist($newUser);
        $this->entityManager->flush();

        $tokenPayload = ['user_id' => $newUser->getId()];
        $token = $this->JWTService->generate($tokenPayload, getenv('JWT_SIGNUP_VALIDATION_SECRET'));

        $tokenSignUp = new TokenSignUp();
        $tokenSignUp->setSignUpToken($token);
        $tokenSignUp->setUsername($newUser->getEmail());
        $this->entityManager->persist($tokenSignUp);
        $this->entityManager->flush();

        $this->emailService->sendSignUpValidationEmail($newUser, $token);

        return $this->responseService->success();
    }
}