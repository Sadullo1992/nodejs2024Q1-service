import * as dotenv from 'dotenv';
import * as path from 'path';
import { DataSource } from 'typeorm';

dotenv.config({
  path: path.join(__dirname, '.env'),
});

const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
} = process.env;

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: POSTGRES_HOST,
  port: parseInt(POSTGRES_PORT, 10) || 5432,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  synchronize: false,
  migrationsRun: false,
  logging: false,
  entities: ['src/resources/**/**.entity{.ts,.js}'],
  migrations: ['src/migrations/*.ts'],
});
