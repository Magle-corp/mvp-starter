<?php

namespace App\Controller\organization;

use App\Entity\Organization;
use App\Service\ResponseService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class DeleteOrganizationController extends AbstractController
{
    private ResponseService $responseService;
    private EntityManagerInterface $entityManager;

    public function __construct(
        ResponseService        $responseService,
        EntityManagerInterface $entityManager,
    )
    {
        $this->responseService = $responseService;
        $this->entityManager = $entityManager;
    }

    public function __invoke(Request $request): Response
    {
        $organizationRepository = $this->entityManager->getRepository(Organization::class);
        $organization = $organizationRepository->findOneBy(['id' => $request->attributes->get('id')]);

        if (!$organization) {
            $this->responseService->error();
        }

        $this->entityManager->remove($organization);
        $this->entityManager->flush();

        return $this->responseService->create('OK', 200);
    }
}