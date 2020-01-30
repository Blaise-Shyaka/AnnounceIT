import express from 'express';
import announcements from '../data/announcements';
import {
  resourceNotFound,
  accessDenied,
  deletedSuccessfully
} from '../helpers/response-messages';
import authoriseUser from '../middlewares/authorisation';

const deleteAnnouncementRouter = express.Router();

deleteAnnouncementRouter.delete(
  '/announcement/:id',
  authoriseUser,
  (req, res) => {
    const announcementId = parseInt(req.params.id, 10);
    const announcementOfInterest = announcements.find(
      ann => ann.id === announcementId
    );

    const admin = req.user.is_admin;

    if (!admin)
      return res.status(401).json({
        status: res.statusCode,
        error: accessDenied
      });

    if (!announcementOfInterest)
      return res.status(404).json({
        error: res.statusCode,
        message: resourceNotFound
      });

    const announcementIndex = announcements.indexOf(announcementOfInterest);

    announcements.splice(announcementIndex, 1);
    res.json({
      status: 200,
      message: deletedSuccessfully
    });
  }
);

export default deleteAnnouncementRouter;
