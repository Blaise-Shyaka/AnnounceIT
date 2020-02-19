/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
import express from 'express';
import bcrypt from 'bcryptjs';
import pool from '../data/config';
import { userExistsMessage } from '../helpers/response-messages';
import { validateNewUser } from '../helpers/validation';

const signupRouterv2 = express.Router();

signupRouterv2.post('/auth/signup', async (req, res) => {
  const { error, value } = await validateNewUser(req.body);

  // Send an error if the data sent by the user is incomplete
  if (error)
    return res.status(400).json({
      status: res.statusCode,
      error: error.details[0].message
    });

  const client = await pool.connect();
  const user = await client.query('SELECT email FROM users WHERE email = $1', [
    value.email
  ]);

  client.release();

  if (user.rows[0])
    return res.status(400).json({
      error: res.statusCode,
      message: userExistsMessage
    });

  // Hash user password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(value.password, salt);
  const userWithHashedPassword = {
    first_name: value.first_name,
    last_name: value.last_name,
    email: value.email,
    phone_number: value.phone_number,
    address: value.address,
    password: hashedPassword,
    is_admin: false,
    is_blacklisted: false
  };

  // Create new user
  const newClient = await pool.connect();

  await newClient.query(
    `INSERT INTO users (
      first_name,
      last_name,
      email,
      phone_number,
      address,
      password,
      is_admin,
      is_blacklisted
  ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8
  )`,
    [
      userWithHashedPassword.first_name,
      userWithHashedPassword.last_name,
      userWithHashedPassword.email,
      userWithHashedPassword.phone_number,
      userWithHashedPassword.address,
      userWithHashedPassword.password,
      userWithHashedPassword.is_admin,
      userWithHashedPassword.is_blacklisted
    ]
  );

  const newUser = await client.query('SELECT * FROM users WHERE email = $1', [
    value.email
  ]);

  client.release();
  res.status(201).json({
    status: res.statusCode,
    data: newUser.rows[0]
  });
});

export default signupRouterv2;
