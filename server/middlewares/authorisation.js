import jwt from 'jsonwebtoken';

// eslint-disable-next-line consistent-return
const authorizeUser = async (req, res, next) => {
  const token = req.header('authorization');

  if (!token)
    return res.status(401).json({
      status: 'error',
      error: 'Access to this resource is denied'
    });

    try{
      const verifiedUser = await jwt.verify(token, 'difficult_to_break_secret_token');
    
      req.user = verifiedUser;
    }
    catch(err){
      if(err) return res.status(401).json({
        status: res.statusCode,
        error: err.message
      });
    }

    next();
  } 

  


export default authorizeUser;
