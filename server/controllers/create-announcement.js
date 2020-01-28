import express from 'express';
import announcements from '../data/announcements';
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

  announcements.push(value);
  res.status(201).json({
    status: res.statusCode,
    data: value
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
