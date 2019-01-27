import express from 'express';
import models from '../../database/models';

const UsersRouter = express.Router();

UsersRouter.post(`/users`, async (req, res) => {
  try {
    const {body} = req;
    const user = await models.User.create(body);
    res.status(201).json({
      message: 'created successfully',
      user
    })
  } catch(error) {
    res.status(400).json({
      error: error.message
    })
  }
});

UsersRouter.get(`/users`, async (req, res) => {
  const users = await models.User.findAll();
  res.status(200).json({
    users,
    message:'you successfully accessed users endpoint'
  });
});

export default UsersRouter;