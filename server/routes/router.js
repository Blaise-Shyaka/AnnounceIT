const express = require('express');
const signupRouter = require('../controllers/signup');
const signinRouter = require('../controllers/signin');
const createAnnouncementRouter = require('../controllers/create-announcement');

const router = express.Router();

router.use('/api/v1/', signupRouter);
router.use('/api/v1/', signinRouter);
router.use('/api/v1/', createAnnouncementRouter);

module.exports = router;
