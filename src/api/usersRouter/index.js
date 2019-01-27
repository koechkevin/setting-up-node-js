import express from 'express';

const UsersRouter = express.Router();

UsersRouter.get(`/users`, (req, res) => {
  res.status(200).json({
    message:'you successfully accessed users endpoint'
  });
});

export default UsersRouter;