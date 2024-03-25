import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewTable1711394866346 implements MigrationInterface {
  name = 'NewTable1711394866346';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "album" DROP CONSTRAINT "FK_3d06f25148a4a880b429e3bc839"`,
    );
    await queryRunner.query(
      `ALTER TABLE "track" DROP CONSTRAINT "FK_b105d945c4c185395daca91606a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "track" DROP CONSTRAINT "FK_997cfd9e91fd00a363500f72dc2"`,
    );
    await queryRunner.query(
      `CREATE TABLE "fav_artist" ("id" SERIAL NOT NULL, "artistId" uuid, CONSTRAINT "REL_b0a31c3cda67e480e04ebb0821" UNIQUE ("artistId"), CONSTRAINT "PK_483d97db9d234bbb2188384d645" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "fav_track" ("id" SERIAL NOT NULL, "trackId" uuid, CONSTRAINT "REL_be7cfde4a093b852b61dda6f9f" UNIQUE ("trackId"), CONSTRAINT "PK_11f7c5379a0db5b3402b0d8ec33" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "fav_album" ("id" SERIAL NOT NULL, "albumId" uuid, CONSTRAINT "REL_5b043828a94ce8e01e39213cb0" UNIQUE ("albumId"), CONSTRAINT "PK_b6c134b9b6ac2d7b457782a86d1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "album" ADD CONSTRAINT "UQ_3d06f25148a4a880b429e3bc839" UNIQUE ("artistId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "track" ADD CONSTRAINT "UQ_997cfd9e91fd00a363500f72dc2" UNIQUE ("artistId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "track" ADD CONSTRAINT "UQ_b105d945c4c185395daca91606a" UNIQUE ("albumId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "album" ADD CONSTRAINT "FK_3d06f25148a4a880b429e3bc839" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "track" ADD CONSTRAINT "FK_997cfd9e91fd00a363500f72dc2" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "track" ADD CONSTRAINT "FK_b105d945c4c185395daca91606a" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "fav_artist" ADD CONSTRAINT "FK_b0a31c3cda67e480e04ebb0821d" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "fav_track" ADD CONSTRAINT "FK_be7cfde4a093b852b61dda6f9fc" FOREIGN KEY ("trackId") REFERENCES "track"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "fav_album" ADD CONSTRAINT "FK_5b043828a94ce8e01e39213cb03" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "fav_album" DROP CONSTRAINT "FK_5b043828a94ce8e01e39213cb03"`,
    );
    await queryRunner.query(
      `ALTER TABLE "fav_track" DROP CONSTRAINT "FK_be7cfde4a093b852b61dda6f9fc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "fav_artist" DROP CONSTRAINT "FK_b0a31c3cda67e480e04ebb0821d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "track" DROP CONSTRAINT "FK_b105d945c4c185395daca91606a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "track" DROP CONSTRAINT "FK_997cfd9e91fd00a363500f72dc2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "album" DROP CONSTRAINT "FK_3d06f25148a4a880b429e3bc839"`,
    );
    await queryRunner.query(
      `ALTER TABLE "track" DROP CONSTRAINT "UQ_b105d945c4c185395daca91606a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "track" DROP CONSTRAINT "UQ_997cfd9e91fd00a363500f72dc2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "album" DROP CONSTRAINT "UQ_3d06f25148a4a880b429e3bc839"`,
    );
    await queryRunner.query(`DROP TABLE "fav_album"`);
    await queryRunner.query(`DROP TABLE "fav_track"`);
    await queryRunner.query(`DROP TABLE "fav_artist"`);
    await queryRunner.query(
      `ALTER TABLE "track" ADD CONSTRAINT "FK_997cfd9e91fd00a363500f72dc2" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "track" ADD CONSTRAINT "FK_b105d945c4c185395daca91606a" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "album" ADD CONSTRAINT "FK_3d06f25148a4a880b429e3bc839" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
    );
  }
}
