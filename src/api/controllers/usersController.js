import models from "../../database/models";
import crypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY;

const createUser = async (req, res) => {
  try {
    const {body: {fullName, email, occupation, gender, password }} = req;
    const hashedPassword = await crypt.hashSync(password, crypt.genSaltSync(10));
    const userData = {
      fullName,
      email,
      password: hashedPassword,
      occupation,
      gender,
    };
    const user = await models.User.create(userData);
    res.status(201).json({
      message: 'created successfully',
      user
    })
  } catch(error) {
    res.status(400).json({
      error: error.message
    })
  }
};

const  getAllUsers = async (req, res) => {
  const { query: {page, search}} = req;
  const limit = 3;
  const count = await models.User.count();
  const pageCount = Math.ceil(count / limit);
  const currentPage = page < 1 || !page || pageCount === 0 ? 1 : Math.min(page, pageCount);
  const offset = limit * (currentPage - 1);
  const users = await models.User.findAll({
    offset, limit, order: [['id', 'DESC']]
  });
  res.status(200).json({
    metaData: {
      users,
      pagination: {
        count,
        pageCount,
        currentPage
      }
    },
    message:'you successfully accessed users endpoint'
  });
  };

  const login = async (req, res) => {
    const {body: { email, password }} = req;
    const user = await models.User.findOne({
      where: {
        email
      }
    });
    if (crypt.compareSync(password, user['password'])) {
      res.status(200).json({
        message: 'success',
        jwt_token: jwt.sign({
          email,
          occupation: user.occupation
        }, SECRET_KEY, { expiresIn: '12h'}
          )
      });
    }
    else {
      res.status(401).json({
        message: 'failed',
        error: 'invalid credentials'
      });
    }
  };

const UsersController = { createUser, getAllUsers, login };
export default UsersController;