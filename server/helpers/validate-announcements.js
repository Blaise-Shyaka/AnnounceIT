const Joi = require('@hapi/joi');

const validateNewAnnouncement = data => {
  const schema = Joi.object({
    text: Joi.string()
      .min(3)
      .required(),
    start_date: Joi.date().required(),
    end_date: Joi.date().required()
  });

  return schema.validate(data);
};

module.exports = validateNewAnnouncement;
