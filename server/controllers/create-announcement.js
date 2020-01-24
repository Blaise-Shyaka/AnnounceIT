const express = require('express');

const authorizeUser = require('../middlewares/authorisation');
const validateNewAnnouncement = require('../helpers/validate-announcements');
const announcements = require('../data/announcements');

const createAnnouncementRouter = express.Router();

createAnnouncementRouter.post(
  '/announcement',
  // eslint-disable-next-line consistent-return
  async (req, res) => {
    const { error, value } = await validateNewAnnouncement(req.body);

    if (error)
      return res.status(400).json({
        status: 'error',
        error: error.details[0].message
      });

    const generateId = () => {
      if (announcements.length === 0) return 1;
      return announcements.length;
    };

    const id = generateId();

    const announcement = {
      id,
      status: 'pending',
      text: value.text,
      start_date: value.start_date,
      end_date: value.end_date
    };

    announcements.push(announcement);

    res.status(201).json({
      status: res.status,
      data: announcement
    });
  }
);

module.exports = createAnnouncementRouter;
