<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230529182638 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE animal_avatar ADD animal_id INT NOT NULL');
        $this->addSql('ALTER TABLE animal_avatar ADD CONSTRAINT FK_AC86B7F38E962C16 FOREIGN KEY (animal_id) REFERENCES animal (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_AC86B7F38E962C16 ON animal_avatar (animal_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE animal_avatar DROP FOREIGN KEY FK_AC86B7F38E962C16');
        $this->addSql('DROP INDEX UNIQ_AC86B7F38E962C16 ON animal_avatar');
        $this->addSql('ALTER TABLE animal_avatar DROP animal_id');
    }
}
