<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230523202807 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE animal_avatar (id INT AUTO_INCREMENT NOT NULL, content_url VARCHAR(255) DEFAULT NULL, file_path VARCHAR(255) DEFAULT NULL, created DATETIME NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE animal CHANGE name name VARCHAR(50) NOT NULL');
        $this->addSql('ALTER TABLE animal_race CHANGE name name VARCHAR(50) NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE animal_avatar');
        $this->addSql('ALTER TABLE animal_race CHANGE name name VARCHAR(80) NOT NULL');
        $this->addSql('ALTER TABLE animal CHANGE name name VARCHAR(255) NOT NULL');
    }
}
