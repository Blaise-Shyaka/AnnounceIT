import express from 'express';
import authoriseUser from '../middlewares/authorisation';
import announcements from '../data/announcements';
import {
  resourceNotFound,
  accessDenied,
  resourceNotModified
} from '../helpers/response-messages';

const changeStatusRouter = express.Router();

changeStatusRouter.patch(
  '/announcement/:id/:status',
  authoriseUser,
  (req, res) => {
    const announcementId = parseInt(req.params.id, 10);
    const announcementStatus = req.params.status;

    const announcementOfInterest = announcements.find(
      ann => ann.id === announcementId
    );

    const isAdmin = req.user.is_admin;

    if (!isAdmin)
      return res.status(401).json({
        error: 401,
        message: accessDenied
      });

    if (!announcementOfInterest)
      res.status(404).json({
        error: 404,
        message: resourceNotFound
      });

    const currentStatus = announcementOfInterest.status;

    if (currentStatus === announcementStatus)
      return res.status(304).json({
        error: res.statusCode,
        message: resourceNotModified
      });

    const announcementIndex = announcements.indexOf(announcementOfInterest);

    announcements[announcementIndex].status = announcementStatus;

    res.status(201).json({
      status: res.statusCode,
      data: announcementOfInterest
    });
  }
);

export default changeStatusRouter;
