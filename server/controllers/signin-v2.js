import express from 'express';
import bcrypt from 'bcryptjs';
import generateToken from '../helpers/generate-token';
import { validateExistingUser } from '../helpers/validation';
import {
  signupInstead,
  incorrectCredentials
} from '../helpers/response-messages';
import pool from '../data/config';

const signinRouterv2 = express.Router();

// eslint-disable-next-line consistent-return
signinRouterv2.post('/auth/signin', async (req, res) => {
  // Check user's input
  const { error, value } = await validateExistingUser(req.body);

  if (error)
    return res.status(400).json({
      status: res.statusCode,
      error: error.details[0].message
    });

  // Check whether the user exists
  const client = await pool.connect();
  const userExists = await client.query(
    'SELECT * FROM users WHERE email = $1',
    [value.email]
  );
  client.release();

  if (!userExists.rows[0])
    return res.status(401).json({
      error: res.statusCode,
      message: signupInstead
    });

  // Verify whether the passwords match
  const correctPassword = await bcrypt.compare(
    value.password,
    userExists.rows[0].password
  );

  if (!correctPassword)
    return res.status(401).json({
      error: res.statusCode,
      message: incorrectCredentials
    });

  // Authenticate user

  try {
    const token = generateToken(userExists.rows[0]);

    res
      .header('authorization', token)
      .status(200)
      .json({
        status: res.statusCode,
        data: {
          token,
          id: userExists.rows[0].id,
          first_name: userExists.rows[0].first_name,
          last_name: userExists.rows[0].last_name,
          email: userExists.rows[0].email
        }
      });
  } catch (e) {
    if (e)
      return res.status(500).json({
        status: 500,
        error: e.message
      });
  }
});

export default signinRouterv2;
