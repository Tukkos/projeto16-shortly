import pg from 'pg';
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;

const connection = new Pool({
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD
});

export default connection;