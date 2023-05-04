<?php

namespace App\Repository;

use App\Entity\AnimalTemper;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<AnimalTemper>
 *
 * @method AnimalTemper|null find($id, $lockMode = null, $lockVersion = null)
 * @method AnimalTemper|null findOneBy(array $criteria, array $orderBy = null)
 * @method AnimalTemper[]    findAll()
 * @method AnimalTemper[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AnimalTemperRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, AnimalTemper::class);
    }

    public function save(AnimalTemper $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(AnimalTemper $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

//    /**
//     * @return AnimalTemper[] Returns an array of AnimalTemper objects
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

//    public function findOneBySomeField($value): ?AnimalTemper
//    {
//        return $this->createQueryBuilder('a')
//            ->andWhere('a.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
