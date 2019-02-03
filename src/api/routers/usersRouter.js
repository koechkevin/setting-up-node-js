import express from 'express';
import UsersController from "../controllers/usersController";
import UsersValidator from "../validators/usersValidator";
import Authenticate from "../authentication/authenticate";

const UsersRouter = express.Router();
const { authenticate } = Authenticate;
const { validateFields, validateUser } = UsersValidator;
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
  getAllUsers
  );

UsersRouter.post(
  '/users/login',
  login
);

export default UsersRouter;