import express from 'express';
import authoriseUser from '../middlewares/authorisation';
import { accessDenied, resourceNotFound } from '../helpers/response-messages';
import announcements from '../data/announcements';

const allSpecificStatusAnnouncementsRouter = express.Router();

allSpecificStatusAnnouncementsRouter.get(
  '/announcement/:status',
  authoriseUser,
  (req, res) => {
    const { status } = req.params;
    const { user } = req;

    if (user.is_admin)
      return res.status(401).json({
        error: 401,
        message: accessDenied
      });

    const allAnnouncements = announcements.filter(
      ann => ann.owner === user.id && ann.status === status
    );

    if (allAnnouncements.length === 0)
      res.status(404).json({
        error: 404,
        message: resourceNotFound
      });

    res.status(200).json({
      status: res.statusCode,
      data: allAnnouncements
    });
  }
);

export default allSpecificStatusAnnouncementsRouter;
