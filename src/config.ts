import * as dotenv from 'dotenv';

dotenv.config();

export const config = {
  DB_TYPE: process.env.DB_TYPE || 'mongo',
};
