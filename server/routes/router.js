import express from 'express';
import signupRouter from '../controllers/signup';
import signinRouter from '../controllers/signin'
import createAnnouncementRouter from '../controllers/create-announcement';
import updateAnnouncementRouter from '../controllers/update-announcement';

const router = express.Router();


router.use('/api/v1/', signupRouter);
router.use('/api/v1/', signinRouter);
router.use('/api/v1/', createAnnouncementRouter);
router.use('/api/v1/', updateAnnouncementRouter);

export default router;
