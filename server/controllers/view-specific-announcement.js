import express from 'express';
import authoriseUser from '../middlewares/authorisation';
import { resourceNotFound } from '../helpers/response-messages';
import announcements from '../data/announcements';

const viewSpecificAnnouncementRouter = express.Router();

viewSpecificAnnouncementRouter.get(
  '/announcement/:id',
  authoriseUser,
  (req, res) => {
    const announcementId = parseInt(req.params.id, 10);
    const { user } = req;

    const announcementOfInterest = announcements.find(
      ann => ann.id === announcementId && user.id === ann.owner
    );

    if (!announcementOfInterest)
      return res.status(404).json({
        error: res.statusCode,
        message: resourceNotFound
      });

    res.status(200).json({
      status: res.statusCode,
      data: announcementOfInterest
    });
  }
);

export default viewSpecificAnnouncementRouter;
