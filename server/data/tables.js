import pool from './config';

const users = `CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          first_name VARCHAR(80) NOT NULL,
          last_name VARCHAR(80) NOT NULL,
          email VARCHAR(50) NOT NULL,
          phone_number VARCHAR(10) NOT NULL,
          address VARCHAR NOT NULL,
          password VARCHAR NOT NULL,
          is_admin BOOLEAN NOT NULL,
          is_blacklisted BOOLEAN NOT NULL
      );`;
const announcements = `CREATE TABLE IF NOT EXISTS announcements (
          id SERIAL PRIMARY KEY,
          owner INT REFERENCES users(id) NOT NULL,
          status VARCHAR NOT NULL,
          text VARCHAR NOT NULL,
          start_date VARCHAR(10) NOT NULL,
          end_date VARCHAR(10) NOT NULL
      );`;
const dropusers = async () => {
  const client = await pool.connect();
  await client.query('DROP TABLE IF EXISTS users CASCADE');
  client.release();
};
const dropannouncements = async () => {
  const client = await pool.connect();
  await client.query('DROP TABLE IF EXISTS announcements CASCADE');
  client.release();
};
const createusersTable = async () => {
  const client = await pool.connect();
  await client.query(users);
  client.release();
};
const createannouncementsTable = async () => {
  const client = await pool.connect();
  await client.query(announcements);
  client.release();
};

export {
  createusersTable,
  createannouncementsTable,
  dropusers,
  dropannouncements
};

require('make-runnable');
