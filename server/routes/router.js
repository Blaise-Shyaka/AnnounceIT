import express from 'express';
import signupRouter from '../controllers/signup';
import signinRouter from '../controllers/signin';
import createAnnouncementRouter from '../controllers/create-announcement';
import updateAnnouncementRouter from '../controllers/update-announcement';
import changeStatusRouter from '../controllers/change-status';
import viewSpecificAnnouncementRouter from '../controllers/view-specific-announcement';

const router = express.Router();

router.use('/api/v1/', signupRouter);
router.use('/api/v1/', signinRouter);
router.use('/api/v1/', createAnnouncementRouter);
router.use('/api/v1/', updateAnnouncementRouter);
router.use('/api/v1/', changeStatusRouter);
router.use('/api/v1/', viewSpecificAnnouncementRouter);

export default router;
