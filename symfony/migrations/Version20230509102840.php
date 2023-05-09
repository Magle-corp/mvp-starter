<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230509102840 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE animal ADD created DATETIME NOT NULL, ADD updated DATETIME NOT NULL, DROP created_at, DROP updated_at');
        $this->addSql('ALTER TABLE animal_race ADD created DATETIME NOT NULL, ADD updated DATETIME NOT NULL, DROP created_at, DROP updated_at');
        $this->addSql('ALTER TABLE animal_sex ADD created DATETIME NOT NULL, ADD updated DATETIME NOT NULL, DROP created_at, DROP updated_at');
        $this->addSql('ALTER TABLE animal_temper ADD created DATETIME NOT NULL, ADD updated DATETIME NOT NULL, DROP created_at, DROP updated_at');
        $this->addSql('ALTER TABLE animal_type ADD created DATETIME NOT NULL, ADD updated DATETIME NOT NULL, DROP created_at, DROP updated_at');
        $this->addSql('ALTER TABLE organization ADD created DATETIME NOT NULL, ADD updated DATETIME NOT NULL, DROP created_at, DROP updated_at');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE organization ADD created_at DATETIME NOT NULL, ADD updated_at DATETIME NOT NULL, DROP created, DROP updated');
        $this->addSql('ALTER TABLE animal_type ADD created_at DATETIME NOT NULL, ADD updated_at DATETIME NOT NULL, DROP created, DROP updated');
        $this->addSql('ALTER TABLE animal_temper ADD created_at DATETIME NOT NULL, ADD updated_at DATETIME NOT NULL, DROP created, DROP updated');
        $this->addSql('ALTER TABLE animal_sex ADD created_at DATETIME NOT NULL, ADD updated_at DATETIME NOT NULL, DROP created, DROP updated');
        $this->addSql('ALTER TABLE animal_race ADD created_at DATETIME NOT NULL, ADD updated_at DATETIME NOT NULL, DROP created, DROP updated');
        $this->addSql('ALTER TABLE animal ADD created_at DATETIME NOT NULL, ADD updated_at DATETIME NOT NULL, DROP created, DROP updated');
    }
}
