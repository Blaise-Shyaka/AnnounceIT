/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
import express from 'express';
import bcrypt from 'bcryptjs';
import { userExistsMessage } from '../helpers/response-messages';
import { validateNewUser } from '../helpers/validation';
import users from '../data/users';

const signupRouter = express.Router();

signupRouter.post('/auth/signup', async (req, res) => {
  const { error, value } = await validateNewUser(req.body);

  // Send an error if the data sent by the user is incomplete
  if (error)
    return res.status(400).json({
      status: res.statusCode,
      error: error.details[0].message
    });

  // Check if the user already exists
  const userExists = await users.find(user => user.email === value.email);

  if (userExists)
    return res.status(400).json({
      error: res.statusCode,
      message: userExistsMessage
    });

  const generateUserId = () => {
    if (users.length === 0) return 1;
    return users.length;
  };

  const id = generateUserId();

  // Hash user password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(value.password, salt);
  const userWithHashedPassword = {
    id,
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
  await users.push(userWithHashedPassword);

  res.status(201).json({
    status: 'success',
    data: userWithHashedPassword
  });
});

export default signupRouter;
