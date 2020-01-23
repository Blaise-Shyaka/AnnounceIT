/* eslint-disable consistent-return */
const express = require('express');
const bcrypt = require('bcryptjs');

const userExistsMessage = require('../helpers/response-messages');

const {
  validateNewUser,
  // eslint-disable-next-line no-unused-vars
  validateExistingUser
} = require('../helpers/validation');
const users = require('../data/users');

const signupRouter = express.Router();

signupRouter.post('/auth/signup', async (req, res) => {
  const { error, value } = await validateNewUser(req.body);

  // Send an error if the data sent by the user is incomplete
  if (error)
    return res.status(400).json({
      status: 'error',
      error: error.details[0].message
    });

  // Check if the user already exists
  const userExists = await users.find(user => user.email === value.email);

  if (userExists) return res.status(400).json(userExistsMessage);

  // Generate user ID
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

module.exports = signupRouter;
