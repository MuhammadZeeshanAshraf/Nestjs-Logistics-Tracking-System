import * as dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT,
  database: {
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
};
