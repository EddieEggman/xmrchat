import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAutoObsOnPageSettings1745658773466 implements MigrationInterface {
    name = 'AddAutoObsOnPageSettings1745658773466'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "page-settings" DROP CONSTRAINT "unique-page-and-key"`);
        await queryRunner.query(`ALTER TYPE "public"."page-settings_key_enum" RENAME TO "page-settings_key_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."page-settings_key_enum" AS ENUM('twitch-channel', 'obs-keep-messages', 'obs-play-sound', 'obs-auto-show-tips')`);
        await queryRunner.query(`ALTER TABLE "page-settings" ALTER COLUMN "key" TYPE "public"."page-settings_key_enum" USING "key"::"text"::"public"."page-settings_key_enum"`);
        await queryRunner.query(`DROP TYPE "public"."page-settings_key_enum_old"`);
        await queryRunner.query(`ALTER TABLE "page-settings" ADD CONSTRAINT "unique-page-and-key" UNIQUE ("page_id", "key")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "page-settings" DROP CONSTRAINT "unique-page-and-key"`);
        await queryRunner.query(`CREATE TYPE "public"."page-settings_key_enum_old" AS ENUM('twitch-channel', 'obs-keep-messages', 'obs-play-sound')`);
        await queryRunner.query(`ALTER TABLE "page-settings" ALTER COLUMN "key" TYPE "public"."page-settings_key_enum_old" USING "key"::"text"::"public"."page-settings_key_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."page-settings_key_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."page-settings_key_enum_old" RENAME TO "page-settings_key_enum"`);
        await queryRunner.query(`ALTER TABLE "page-settings" ADD CONSTRAINT "unique-page-and-key" UNIQUE ("key", "page_id")`);
    }

}
