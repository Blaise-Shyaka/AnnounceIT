import Joi from '@hapi/joi';

export const validateNewUser = userData => {
  const schema = Joi.object({
    first_name: Joi.string()
      .min(3)
      .max(25)
      .required(),
    last_name: Joi.string()
      .min(3)
      .max(25)
      .required(),
    email: Joi.string()
      .email()
      .required(),
    phone_number: Joi.string()
      .min(10)
      .max(10)
      .required(),
    address: Joi.string()
      .min(4)
      .max(25)
      .required(),
    password: Joi.string()
      .alphanum()
      .required(),
    confirm_password: Joi.ref('password')
  });

  return schema.validate(userData);
};

export const validateExistingUser = data => {
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .alphanum()
      .required()
  });

  return schema.validate(data);
};
