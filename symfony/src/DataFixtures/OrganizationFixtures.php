<?php

namespace App\DataFixtures;
use App\Entity\Organization;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class OrganizationFixtures extends AbstractFixtures implements DependentFixtureInterface
{
    public const REF_ORGANIZATION = self::class;

    public function load(ObjectManager $manager): void
    {
        for ($i = 0; $i < 5; $i++) {
            $organization = new Organization();

            $organization->setName($this->faker->company());
            $organization->setOwner($this->getReference(UserFixtures::REF_USER . '_' . $i));
            $organization->setPublic($this->faker->boolean());

            if ($this->faker->boolean()) {
                $organization->setAddress($this->faker->streetName());
                $organization->setCity($this->faker->city());
                $organization->setZipCode($this->faker->randomNumber(5, true));
            }

            $manager->persist($organization);

            $this->setReference(self::REF_ORGANIZATION . '_' . $i, $organization);
        }

        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [
            UserFixtures::REF_USER
        ];
    }
}