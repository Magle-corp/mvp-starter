<?php

namespace App\Repository;

use App\Entity\OrganizationAnimalRace;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<OrganizationAnimalRace>
 *
 * @method OrganizationAnimalRace|null find($id, $lockMode = null, $lockVersion = null)
 * @method OrganizationAnimalRace|null findOneBy(array $criteria, array $orderBy = null)
 * @method OrganizationAnimalRace[]    findAll()
 * @method OrganizationAnimalRace[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class OrganizationAnimalRaceRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, OrganizationAnimalRace::class);
    }

    public function save(OrganizationAnimalRace $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(OrganizationAnimalRace $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

//    /**
//     * @return OrganizationAnimalRace[] Returns an array of OrganizationAnimalRace objects
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

//    public function findOneBySomeField($value): ?OrganizationAnimalRace
//    {
//        return $this->createQueryBuilder('o')
//            ->andWhere('o.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
