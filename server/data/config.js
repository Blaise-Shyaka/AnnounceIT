import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let connectionString = '';

if (process.env.NODE_ENV === 'production') {
  connectionString = process.env.DATABASE_URL;
} else if (process.env.NODE_ENV === 'dev') {
  connectionString = `postgresql://${process.env.DBUSER}:${process.env.DBPASSWORD}@${process.env.DBHOST}:${process.env.DBPORT}/${process.env.DBDATABASE}`;
} else {
  connectionString = `postgresql://${process.env.DBUSER}:${process.env.DBPASSWORD}@${process.env.DBHOST}:${process.env.DBPORT}/${process.env.DBTESTDATABASE}`;
}

const pool = new Pool({ connectionString });

export default pool;
