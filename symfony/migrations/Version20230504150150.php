<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230504150150 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE animal_animal_temper (animal_id INT NOT NULL, animal_temper_id INT NOT NULL, INDEX IDX_DBB32ACC8E962C16 (animal_id), INDEX IDX_DBB32ACCC34EA92B (animal_temper_id), PRIMARY KEY(animal_id, animal_temper_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE animal_animal_temper ADD CONSTRAINT FK_DBB32ACC8E962C16 FOREIGN KEY (animal_id) REFERENCES animal (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE animal_animal_temper ADD CONSTRAINT FK_DBB32ACCC34EA92B FOREIGN KEY (animal_temper_id) REFERENCES animal_temper (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE animal_animal_temper DROP FOREIGN KEY FK_DBB32ACC8E962C16');
        $this->addSql('ALTER TABLE animal_animal_temper DROP FOREIGN KEY FK_DBB32ACCC34EA92B');
        $this->addSql('DROP TABLE animal_animal_temper');
    }
}
