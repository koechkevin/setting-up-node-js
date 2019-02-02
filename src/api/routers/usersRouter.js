import express from 'express';
import UsersController from "../controllers/usersController";
import UsersValidator from "../validators/usersValidator";

const UsersRouter = express.Router();

UsersRouter.post(
  '/users',
  UsersValidator.validateFields,
  UsersValidator.validateUser,
  UsersController.createUser
  );

UsersRouter.get(
  '/users',
  UsersController.getAllUsers
  );

UsersRouter.post(
  '/users/login',
  UsersController.login
);

export default UsersRouter;