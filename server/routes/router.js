const express = require('express');
const signupRouter = require('../controllers/signup');
const signinRouter = require('../controllers/signin');

const router = express.Router();

router.use('/api/v1/', signupRouter);
router.use('/api/v1/', signinRouter);

module.exports = router;
