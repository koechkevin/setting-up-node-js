import models from "../../database/models";
import crypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY;

class UsersController {
  static async createUser (req, res){
      try {
        const {body: {fullName, email, occupation, gender, password }} = req;
        const hashedPassword = await crypt.hashSync(password, crypt.genSaltSync(10));
        const userData = {
          fullName,
          email,
          password: hashedPassword,
          occupation,
          gender
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
    }

  static async getAllUsers (req, res) {
    const users = await models.User.findAll();
    res.status(200).json({
      users,
      message:'you successfully accessed users endpoint'
    });
  }

  static async login (req, res) {
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
  }
}

export default UsersController;