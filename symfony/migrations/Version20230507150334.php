<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230507150334 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE admin_animal_race (id INT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE animal_race (id INT AUTO_INCREMENT NOT NULL, type_id INT NOT NULL, name VARCHAR(80) NOT NULL, discr VARCHAR(255) NOT NULL, INDEX IDX_9D42FA9BC54C8C93 (type_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE organization_animal_race (id INT NOT NULL, organization_id INT NOT NULL, INDEX IDX_AD1E5EE032C8A3DE (organization_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE admin_animal_race ADD CONSTRAINT FK_58B392BF396750 FOREIGN KEY (id) REFERENCES animal_race (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE animal_race ADD CONSTRAINT FK_9D42FA9BC54C8C93 FOREIGN KEY (type_id) REFERENCES animal_type (id)');
        $this->addSql('ALTER TABLE organization_animal_race ADD CONSTRAINT FK_AD1E5EE032C8A3DE FOREIGN KEY (organization_id) REFERENCES organization (id)');
        $this->addSql('ALTER TABLE organization_animal_race ADD CONSTRAINT FK_AD1E5EE0BF396750 FOREIGN KEY (id) REFERENCES animal_race (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE animal ADD race_id INT NOT NULL');
        $this->addSql('ALTER TABLE animal ADD CONSTRAINT FK_6AAB231F6E59D40D FOREIGN KEY (race_id) REFERENCES animal_race (id)');
        $this->addSql('CREATE INDEX IDX_6AAB231F6E59D40D ON animal (race_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE animal DROP FOREIGN KEY FK_6AAB231F6E59D40D');
        $this->addSql('ALTER TABLE admin_animal_race DROP FOREIGN KEY FK_58B392BF396750');
        $this->addSql('ALTER TABLE animal_race DROP FOREIGN KEY FK_9D42FA9BC54C8C93');
        $this->addSql('ALTER TABLE organization_animal_race DROP FOREIGN KEY FK_AD1E5EE032C8A3DE');
        $this->addSql('ALTER TABLE organization_animal_race DROP FOREIGN KEY FK_AD1E5EE0BF396750');
        $this->addSql('DROP TABLE admin_animal_race');
        $this->addSql('DROP TABLE animal_race');
        $this->addSql('DROP TABLE organization_animal_race');
        $this->addSql('DROP INDEX IDX_6AAB231F6E59D40D ON animal');
        $this->addSql('ALTER TABLE animal DROP race_id');
    }
}
