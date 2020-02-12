import express from 'express';
import signupRouter from '../controllers/signup';
import signinRouter from '../controllers/signin';
import createAnnouncementRouter from '../controllers/create-announcement';
import updateAnnouncementRouter from '../controllers/update-announcement';
import changeStatusRouter from '../controllers/change-status';
import viewSpecificAnnouncementRouter from '../controllers/view-specific-announcement';
import allSpecificStatusAnnouncementsRouter from '../controllers/all-specific-status-announcements';
import deleteAnnouncementRouter from '../controllers/delete-announcement';
import adminAllAnnouncementsRouter from '../controllers/admin-view-all-announcements';

// v2 routes
import signupRouterv2 from '../controllers/signup-v2';

const router = express.Router();

router.use('/api/v1/', signupRouter);
router.use('/api/v1/', signinRouter);
router.use('/api/v1/', createAnnouncementRouter);
router.use('/api/v1/', updateAnnouncementRouter);
router.use('/api/v1/', viewSpecificAnnouncementRouter);
router.use('/api/v1/', changeStatusRouter);
router.use('/api/v1/', allSpecificStatusAnnouncementsRouter);
router.use('/api/v1/', deleteAnnouncementRouter);
router.use('/api/v1/', adminAllAnnouncementsRouter);

// Mount V2 routes
router.use('/api/v2/', signupRouterv2);

export default router;
