import jwt from 'jsonwebtoken';

const authenticate = (req, res, next) => {
  const {headers: {authorization}} = req;
  if (!authorization) {
    return res.status(401)
      .json({
        success: false,
        errors: 'Please provide an authentication token'
      });
  }
  const {verify} = jwt;
  verify(authorization, process.env.SECRET_KEY, (error, token) => {
      if (error) {
        return res.status(401).json({success: false, errors: 'Token is invalid'});
      }
      req.jwt_token = token;
      return next();
    }
  );
};

const checkRole = (roles) => {

};
const Authenticate = {
  authenticate
};

export default Authenticate;