import jwt from 'jsonwebtoken';

const generateToken = data => {
  const token = jwt.sign(data, process.env.TOKEN_SECRET_KEY);

  return token;
};

export default generateToken;
