import models from "../../database/models";
class UsersValidator {
  static async validateUser(req, res, next){
    const {body: { email }} = req;
    const user = await models.User.findOne({
      where: {
        email
      }
    });
    if(user) {
      return res.status(409).json({
        error: 'User already exists'
      });
    }
    next()
  }

  static validateFields(req, res, next) {
    req.checkBody('fullName', 'fullName is required')
      .notEmpty()
      .ltrim();
    req.checkBody('email', 'provide a valid email')
      .matches(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)
    req.checkBody('occupation', 'required')
      .ltrim()
      .notEmpty();
    req.checkBody('password', 'required')
      .ltrim()
      .notEmpty();
    req.checkBody('occupation', 'required')
      .ltrim()
      .notEmpty();
    req.checkBody('gender', 'male/female')
      .custom(gender => gender === 'male' || gender === 'female')
    const errors = req.validationErrors();
    if (errors) {
      return res.status(422).json({
        errors
      })
    }
    next()
  }

}

export default UsersValidator;