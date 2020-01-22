const Joi = require('@hapi/joi');

const validateNewUser = userData => {
  const schema = Joi.object({
    first_name: Joi.string()
      .min(3)
      .max(12)
      .required(),
    last_name: Joi.string()
      .min(3)
      .max(12)
      .required(),
    email: Joi.string()
      .email()
      .required(),
    phone_number: Joi.string()
      .max(10)
      .required(),
    address: Joi.string()
      .min(4)
      .max(12)
      .required(),
    password: Joi.string()
      .alphanum()
      .required(),
    confirm_password: Joi.ref('password')
  });

  return schema.validate(userData);
};

module.exports = validateNewUser;
