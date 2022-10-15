import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterUserRenameAdmin1665871945016 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameColumn("users", "isAdmin", "admin");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameColumn("users", "admin", "isAdmin");
    }
}
