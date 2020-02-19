import pool from './config';

const tables = {
  users: `CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          first_name VARCHAR(80) NOT NULL,
          last_name VARCHAR(80) NOT NULL,
          email VARCHAR(50) NOT NULL,
          phone_number VARCHAR(10) NOT NULL,
          address VARCHAR NOT NULL,
          password VARCHAR NOT NULL,
          is_admin BOOLEAN NOT NULL,
          is_blacklisted BOOLEAN NOT NULL
      );`,
  announcements: `CREATE TABLE IF NOT EXISTS announcements (
          id SERIAL PRIMARY KEY,
          owner INT REFERENCES users(id) NOT NULL,
          status VARCHAR NOT NULL,
          text VARCHAR NOT NULL,
          start_date VARCHAR(10) NOT NULL,
          end_date VARCHAR(10) NOT NULL
      );`,
  dropusers: async () => {
    const client = await pool.connect();
    await client.query('DROP TABLE users IF EXISTS CASCADE');
    client.release();
  },
  dropannouncements: async () => {
    const client = await pool.connect();
    await client.query('DROP TABLE announcements IF EXISTS CASCADE');
    client.release();
  },
  createusersTable: async () => {
    const client = await pool.connect();
    await client.query(this.users);
    client.release();
  },
  createannouncementsTable: async () => {
    const client = await pool.connect();
    await client.query(this.announcements);
    client.release();
  }
};

export default tables;

require('make-runnable');
