const express = require('express');
const signupRouter = require('../controllers/signup');

const router = express.Router();

router.use('/api/v1/', signupRouter);

module.exports = router;
