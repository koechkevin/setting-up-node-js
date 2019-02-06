import jwt from 'jsonwebtoken';
import jwtDecode from 'jwt-decode';
import models from '../../database/models';

const authenticate = async (req, res, next) => {
  const { headers: { authorization } } = req;
  if (!authorization) {
    return res.status(401)
      .json({
        success: false,
        errors: 'Please provide an authentication token'
      });
  }
  const { verify } = jwt;
  verify(authorization, process.env.SECRET_KEY, (error, token) => {
    if (error) {
      return res.status(401).json({ success: false, errors: 'Token is invalid' });
    }
    req.jwt_token = token;
    return next();
  });
};

const checkRole = async ({ email }) => {
  const user = await models.User.findOne({
    where: {
      email
    }
  });
  const { role } = user;
  return role;
};

const allowRoles = roles => async (req, res, next) => {
  const { headers: { authorization } } = req;
  const decode = jwtDecode(authorization);
  const role = await checkRole(decode);
  if (!role.includes(roles)) {
    return res.status(403).json({
      error: 'You do not have access to this endpoint'
    });
  }
  return next();
};

const Authenticate = {
  authenticate,
  allowRoles,
};

export default Authenticate;
