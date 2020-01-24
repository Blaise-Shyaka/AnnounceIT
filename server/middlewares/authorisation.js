const jwt = require('jsonwebtoken');

// eslint-disable-next-line consistent-return
const authorizeUser = async (req, res, next) => {
  const token = req.header('authorization');

  if (!token)
    return res.status(401).json({
      status: 'error',
      error: 'Access to this resource is denied'
    });

  console.log('ahead');

  const verifiedUser = await jwt
    .verify(token, 'difficult_to_break_secret_key')
    .catch(err => {
      if (err) console.log(err);
    });

  console.log(verifiedUser);

  if (!verifiedUser)
    return res.status(401).json({
      status: 'error',
      error: 'Invalid token'
    });

  req.user = verifiedUser;

  next();
};

module.exports = authorizeUser;
