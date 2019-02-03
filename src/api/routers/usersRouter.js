import express from 'express';
import UsersController from "../controllers/usersController";
import UsersValidator from "../validators/usersValidator";
import Authenticate from "../authentication/authenticate";
import roles from "../controllers/roles";


const UsersRouter = express.Router();
const { changeRole } = roles;
const { authenticate, allowRoles } = Authenticate;
const { validateFields, validateUser, roleValidator } = UsersValidator;
const { createUser, getAllUsers, login } = UsersController;
UsersRouter.post(
  '/users',
  validateFields,
  validateUser,
  createUser
  );

UsersRouter.get(
  '/users',
  authenticate,
  allowRoles(['Super Administrator']),
  getAllUsers
  );

UsersRouter.post(
  '/users/login',
  login
);

UsersRouter.put(
  '/users/roles/:email',
  allowRoles(['Super Administrator']),
  roleValidator,
  changeRole
);

export default UsersRouter;