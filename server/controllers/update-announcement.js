import express from 'express';
import authoriseUser from '../middlewares/authorisation';
import { resourceNotFound } from '../helpers/response-messages';
import validateNewAnnouncement from '../helpers/validate-announcements';
import announcements from '../data/announcements';

const updateAnnouncementRouter = express.Router();

updateAnnouncementRouter.patch(
  '/announcement/:id',
  authoriseUser,
  async (req, res) => {
    const announcementId = parseInt(req.params.id, 10);
    const announcement = await announcements.find(
      ann => ann.id === announcementId
    );

    if (!announcement)
      return res.status(404).json({
        error: 404,
        message: resourceNotFound
      });

    const announcementIndex = announcements.indexOf(announcement);

    const { error, value } = await validateNewAnnouncement(req.body);

    if (error)
      return res.status(400).json({
        error: res.statusCode,
        message: error.details[0].message
      });

    const newAnnouncement = {
      id: announcementId,
      owner: announcement.owner,
      status: 'pending',
      text: value.text,
      start_date: value.start_date,
      end_date: value.end_date
    };

    if (announcement.owner === req.user.id) {
      announcements[announcementIndex] = newAnnouncement;
      res.status(201).json({
        status: res.statusCode,
        data: newAnnouncement
      });
    } else {
      res.status(404).json({
        status: res.statusCode,
        message: resourceNotFound
      });
    }
  }
);

export default updateAnnouncementRouter;
