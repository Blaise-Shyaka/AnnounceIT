import express from 'express';
import authorizeUser from '../middlewares/authorisation';
import { accessDenied, resourceNotFound } from '../helpers/response-messages';
import announcements from '../data/announcements';

const adminAllAnnouncementsRouter = express.Router();

adminAllAnnouncementsRouter.get('/announcement', authorizeUser, (req, res) => {
  const isAdmin = req.user.is_admin;

  if (!isAdmin)
    return res.status(401).json({
      status: res.statusCode,
      error: accessDenied
    });

  if (announcements.length === 0)
    return res.status(404).json({
      error: res.statusCode,
      message: resourceNotFound
    });

  res.status(200).json({
    status: res.statusCode,
    data: announcements
  });
});

export default adminAllAnnouncementsRouter;
