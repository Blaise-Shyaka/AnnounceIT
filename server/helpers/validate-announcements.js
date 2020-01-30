import Joi from '@hapi/joi';

const validateNewAnnouncement = data => {
  const schema = Joi.object({
    text: Joi.string()
      .min(3)
      .required(),
    start_date: Joi.date()
      .format('YYYY-MM-DD')
      .required(),
    end_date: Joi.date()
      .format('YYYY-MM-DD')
      .required()
  });

  return schema.validate(data);
};

export default validateNewAnnouncement;
