<?php

namespace App\Repository;

use App\Entity\OrganizationAnimalTemper;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<OrganizationAnimalTemper>
 *
 * @method OrganizationAnimalTemper|null find($id, $lockMode = null, $lockVersion = null)
 * @method OrganizationAnimalTemper|null findOneBy(array $criteria, array $orderBy = null)
 * @method OrganizationAnimalTemper[]    findAll()
 * @method OrganizationAnimalTemper[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class OrganizationAnimalTemperRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, OrganizationAnimalTemper::class);
    }

    public function save(OrganizationAnimalTemper $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(OrganizationAnimalTemper $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

//    /**
//     * @return OrganizationAnimalTemper[] Returns an array of OrganizationAnimalTemper objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('o')
//            ->andWhere('o.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('o.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?OrganizationAnimalTemper
//    {
//        return $this->createQueryBuilder('o')
//            ->andWhere('o.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
