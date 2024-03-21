import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
} = process.env;

export const typeOrmConfig = (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: POSTGRES_HOST,
  port: parseInt(POSTGRES_PORT, 10) || 5432,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  synchronize: true,
  logging: true,
  entities: ['src/resources/**/**.entity{.ts,.js}'],
  migrations: [],
});
