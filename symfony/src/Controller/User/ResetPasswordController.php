<?php

namespace App\Controller\User;

use App\Entity\TokenResetPassword;
use App\Entity\User;
use App\Service\JWTService;
use App\Service\ResponseService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

#[AsController]
class ResetPasswordController extends AbstractController
{
    private JWTService $JWTService;
    private ResponseService $responseService;
    private EntityManagerInterface $entityManager;
    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(
        JWTService                  $JWTService,
        ResponseService             $responseService,
        EntityManagerInterface      $entityManager,
        UserPasswordHasherInterface $passwordHasher,
    )
    {
        $this->JWTService = $JWTService;
        $this->responseService = $responseService;
        $this->entityManager = $entityManager;
        $this->passwordHasher = $passwordHasher;
    }

    public function __invoke(Request $request)
    {
        $requestContent = json_decode($request->getContent(), true);

        if (!array_key_exists('token', $requestContent) || !array_key_exists('password', $requestContent)) {
            return $this->responseService->error();
        }

        $resetPasswordToken = $requestContent['token'];
        $newPassword = $requestContent['password'];

        $isExpiredToken = $this->JWTService->isExpired($resetPasswordToken);
        $isValidToken = $this->JWTService->isValid($resetPasswordToken);
        $isValidSecret = $this->JWTService->check($resetPasswordToken, getenv('JWT_RESET_PASSWORD_SECRET'));

        if ($isExpiredToken) {
            return $this->responseService->create('Le lien n\'est plus valide', 401);
        }

        if (!$isValidToken || !$isValidSecret) {
            return $this->responseService->create('Le lien n\'est pas valide', 409);
        }

        $tokenPayload = $this->JWTService->getPayload($resetPasswordToken);

        if (!array_key_exists('user_id', $tokenPayload)) {
            return $this->responseService->error();
        }

        $userId = $tokenPayload['user_id'];

        $userRepository = $this->entityManager->getRepository(User::class);
        $user = $userRepository->findOneBy(['id' => $userId]);

        /* If the token user id isn't registered returns an HTTP response with status 200 to not communicate confidential information */
        if (!$user) {
            return $this->responseService->success();
        }

        $tokenResetPasswordRepository = $this->entityManager->getRepository(TokenResetPassword::class);
        $latestRegisteredTokenResetPassword = $tokenResetPasswordRepository->findOneBy(['username' => $user->getEmail()], ['id' => 'DESC']);

        if (!$latestRegisteredTokenResetPassword) {
            return $this->responseService->error();
        }

        if ($latestRegisteredTokenResetPassword->isUsed()) {
            return $this->responseService->create('Le lien a déjà été utilisé', 409);
        }

        if ($latestRegisteredTokenResetPassword->getResetPasswordToken() !== $resetPasswordToken) {
            return $this->responseService->create('Le lien n\'est pas valide', 409);
        }

        $latestRegisteredTokenResetPassword->setUsed(true);
        $this->entityManager->persist($latestRegisteredTokenResetPassword);

        $user->setPassword($this->passwordHasher->hashPassword($user, $newPassword));
        $this->entityManager->persist($user);

        $this->entityManager->flush();

        return $this->responseService->success();
    }
}