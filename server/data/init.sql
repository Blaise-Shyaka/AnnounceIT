 CREATE TABLE IF NOT EXISTS users(
 id SERIAL PRIMARY KEY,
 first_name VARCHAR(255) NOT NULL,
 last_name VARCHAR(255) NOT NULL,
 email VARCHAR UNIQUE NOT NULL,
 phone_number VARCHAR(10) NOT NULL,
 address VARCHAR NOT NULL,
 password VARCHAR NOT NULL,
 isAdmin BOOLEAN NOT NULL,
 is_blacklisted BOOLEAN NOT NULL);

INSERT INTO users(
 first_name, last_name, email, phone_number, address, password, isadmin, is_blacklisted)
 VALUES('Ronnie', 'Cheng', 'ronniecheng@gmail.com', '0787555444', 'New York', 'igotapassword', false, false);

CREATE TABLE IF NOT EXISTS announcements
 (id SERIAL PRIMARY KEY,
 text VARCHAR NOT NULL,
 start_date VARCHAR(11) NOT NULL,
 end_date VARCHAR(11) NOT NULL,
 status VARCHAR NOT NULL,
 owner BIGINT REFERENCES users(id) NOT NULL);

INSERT INTO announcements(text, start_date, end_date, status, owner)
 VALUES('Hello guys, i have an important event coming up', '2020-02-12', '2020-03-12', 'pending', 1);
