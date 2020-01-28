import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import generateToken from '../helpers/generate-token';

const {
  // eslint-disable-next-line no-unused-vars
  validateNewUser,
  validateExistingUser
} = require('../helpers/validation');
const users = require('../data/users');
const {
  // eslint-disable-next-line no-unused-vars
  userExistsMessage,
  signupInstead,
  incorrectCredentials
} = require('../helpers/response-messages');

const signinRouter = express.Router();

// eslint-disable-next-line consistent-return
signinRouter.post('/auth/signin', async (req, res) => {
  // Check user's input
  const { error, value } = await validateExistingUser(req.body);

  if (error)
    return res.status(400).json({
      status: 'error',
      error: error.details[0].message
    });

  // Check whether the user exists
  const userExists = await users.find(user => user.email === value.email);
  if (!userExists) return res.status(401).json(signupInstead);

  // Verify whether the passwords match
  const correctPassword = await bcrypt.compare(
    value.password,
    userExists.password
  );

  if (!correctPassword) return res.status(401).json(incorrectCredentials);

  // Get user ID
  const getUserId = () => {
    return users.indexOf(userExists) + 1;
  };

  const id = getUserId();

  // Authenticate user

  try{
    const token = await generateToken(userExists);

      res.header('authorization', token).status(201).json({
        status: res.statusCode,
        data: {
          token,
          id: userExists.id,
          first_name: userExists.first_name,
          last_name: userExists.last_name,
          email: userExists.email
        }
      });
  }
  catch(e) {
    if(e) return res.status(500).json({
      status: 500,
      error: e.message
    });
  }
});

export default signinRouter;
