import Joi from '@hapi/joi';

const validateNewAnnouncement = data => {
  const schema = Joi.object({
    text: Joi.string()
      .min(3)
      .required(),
    start_date: Joi.string().required(),
    end_date: Joi.string().required()
  });

  return schema.validate(data);
};

export default validateNewAnnouncement;
