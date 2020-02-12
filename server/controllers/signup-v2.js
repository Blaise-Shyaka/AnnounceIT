/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
import express from 'express';
import bcrypt from 'bcryptjs';
import { userExistsMessage } from '../helpers/response-messages';
import { validateNewUser } from '../helpers/validation';
import users from '../data/users';
import pool from '../data/config';

const signupRouterv2 = express.Router();

signupRouterv2.post('/auth/signup', async (req, res) => {
  try {
    const { error, value } = await validateNewUser(req.body);

    // Send an error if the data sent by the user is incomplete
    if (error)
      return res.status(400).json({
        status: res.statusCode,
        error: error.details[0].message
      });

    // Check if the user already exists

    const userExists = await pool.query(
      `SELECT email from users where email = $1`,
      [value.email]
    );

    if (userExists.rows.length > 0)
      return res.status(400).json({
        error: res.statusCode,
        message: userExistsMessage
      });

    // Hash user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(value.password, salt);

    // Create new user

    await pool.query(
      `INSERT INTO users(first_name,
            last_name,
            email,
            phone_number,
            address,
            password,
            isadmin,
            is_blacklisted) VALUES($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        value.first_name,
        value.last_name,
        value.email,
        value.phone_number,
        value.address,
        hashedPassword,
        false,
        false
      ]
    );

    const lastAddedUser = await pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [value.email]
    );

    res.status(201).json({
      status: res.statusCode,
      data: lastAddedUser.rows[0]
    });
  } catch (e) {
    return e.stack;
  }
});

export default signupRouterv2;
