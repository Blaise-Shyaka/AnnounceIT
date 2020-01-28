import express from 'express';
import { announcements } from '../data/announcements';
import validateAnnouncement from '../helpers/validate-announcements';
import authoriseUser from '../middlewares/authorisation';
import internalValidationError from '../helpers/response-messages';

const createAnnouncementRouter = express.Router();

createAnnouncementRouter.post('/announcement', authoriseUser, async (req, res) => {
  try{
    const { value, error } = await validateAnnouncement(req.body);
    if(error) return res.status(400).json({
      status: res.statusCode,
      error: error.details[0].message
    });

  const generateAnnouncementId = () => {
      if (announcements.length === 0) return 1;
      return users.length;
    };

  const id = generateAnnouncementId();

  const newAnnouncement = {
    id,
    owner: req.user.id,
    status: 'pending',
    text: value.text,
    start_date: value.start_date,
    end_date: value.end_date
  }

  announcements.push(newAnnouncement);
  res.status(201).json({
    status: res.statusCode,
    data: newAnnouncement
  });
}

catch(e){
  if(e) return res.status(500).json({
    status: res.statusCode,
    error: internalValidationError
  })
}
  
});

export default createAnnouncementRouter;
