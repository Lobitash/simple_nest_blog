import * as dotenv from 'dotenv';

dotenv.config();

export const config = {
  DATABASE_TYPE: process.env.DATABASE_TYPE || 'mongo',
};
