<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230505202742 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE admin_animal_type (id INT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE animal_type (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(50) NOT NULL, discr VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE organization_animal_type (id INT NOT NULL, organization_id INT NOT NULL, INDEX IDX_FBAFB26632C8A3DE (organization_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE admin_animal_type ADD CONSTRAINT FK_56E95F14BF396750 FOREIGN KEY (id) REFERENCES animal_type (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE organization_animal_type ADD CONSTRAINT FK_FBAFB26632C8A3DE FOREIGN KEY (organization_id) REFERENCES organization (id)');
        $this->addSql('ALTER TABLE organization_animal_type ADD CONSTRAINT FK_FBAFB266BF396750 FOREIGN KEY (id) REFERENCES animal_type (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE admin_animal_type DROP FOREIGN KEY FK_56E95F14BF396750');
        $this->addSql('ALTER TABLE organization_animal_type DROP FOREIGN KEY FK_FBAFB26632C8A3DE');
        $this->addSql('ALTER TABLE organization_animal_type DROP FOREIGN KEY FK_FBAFB266BF396750');
        $this->addSql('DROP TABLE admin_animal_type');
        $this->addSql('DROP TABLE animal_type');
        $this->addSql('DROP TABLE organization_animal_type');
    }
}
