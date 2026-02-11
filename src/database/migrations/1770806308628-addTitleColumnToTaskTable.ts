import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTitleColumnToTaskTable1770806308628 implements MigrationInterface {
    name = 'AddTitleColumnToTaskTable1770806308628'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tasks\` ADD \`title\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tasks\` DROP COLUMN \`title\``);
    }

}
