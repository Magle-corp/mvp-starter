<?php

namespace App\Repository;

use App\Entity\AdminAnimalRace;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<AdminAnimalRace>
 *
 * @method AdminAnimalRace|null find($id, $lockMode = null, $lockVersion = null)
 * @method AdminAnimalRace|null findOneBy(array $criteria, array $orderBy = null)
 * @method AdminAnimalRace[]    findAll()
 * @method AdminAnimalRace[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AdminAnimalRaceRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, AdminAnimalRace::class);
    }

    public function save(AdminAnimalRace $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(AdminAnimalRace $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

//    /**
//     * @return AdminAnimalRace[] Returns an array of AdminAnimalRace objects
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

//    public function findOneBySomeField($value): ?AdminAnimalRace
//    {
//        return $this->createQueryBuilder('a')
//            ->andWhere('a.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
