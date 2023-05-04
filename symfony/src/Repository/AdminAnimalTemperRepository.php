<?php

namespace App\Repository;

use App\Entity\AdminAnimalTemper;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<AdminAnimalTemper>
 *
 * @method AdminAnimalTemper|null find($id, $lockMode = null, $lockVersion = null)
 * @method AdminAnimalTemper|null findOneBy(array $criteria, array $orderBy = null)
 * @method AdminAnimalTemper[]    findAll()
 * @method AdminAnimalTemper[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AdminAnimalTemperRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, AdminAnimalTemper::class);
    }

    public function save(AdminAnimalTemper $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(AdminAnimalTemper $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

//    /**
//     * @return AdminAnimalTemper[] Returns an array of AdminAnimalTemper objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('a')
//            ->andWhere('a.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('a.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?AdminAnimalTemper
//    {
//        return $this->createQueryBuilder('a')
//            ->andWhere('a.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
