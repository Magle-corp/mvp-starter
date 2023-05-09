<?php

namespace App\DataFixtures;

use App\Entity\AnimalSex;
use App\Entity\User;
use DateTime;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserFixtures extends AbstractFixtures
{
    public const REF_USER = self::class;


    public function load(ObjectManager $manager): void
    {
        $adminUser = new User();
        $adminUser->setEmail('admin@magle.fr');
        $adminUser->setRoles([]);
        $adminUser->setVerified(1);
        $adminUser->setPassword($this->passwordHasher->hashPassword($adminUser, '12345678'));

        $manager->persist($adminUser);

        $this->setReference(self::REF_USER . '_' . 0, $adminUser);

        for ($i = 1; $i < 6; $i++) {
            $user = new User();
            $user->setEmail($this->faker->email());
            $user->setRoles([]);
            $user->setVerified(1);
            $user->setPassword($this->passwordHasher->hashPassword($user, '12345678'));

            $manager->persist($user);

            $this->setReference(self::REF_USER . '_' . $i, $user);
        }

        $manager->flush();
    }
}