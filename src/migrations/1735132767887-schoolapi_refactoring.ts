import { MigrationInterface, QueryRunner } from 'typeorm';

export class SchoolapiRefactoring1735132767887 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "students" RENAME COLUMN "studentName" TO "student name"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "students" RENAME COLUMN "student name"  TO "studentName"`);
  }
}
