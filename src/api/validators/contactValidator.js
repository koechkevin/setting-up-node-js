/* eslint-disable no-useless-escape */
/* eslint-disable max-len */
const contactValidator = (req, res, next) => {
  req.checkBody('name', 'name is required')
    .ltrim()
    .notEmpty();
  req.checkBody('phone', 'phone should be more than 10 characters')
    .len({ min: 10 })
    .notEmpty();
  req.checkBody('email', 'provide a valid email')
    .matches(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
  const errors = req.validationErrors();
  if (errors) {
    return res.status(422).json({
      errors
    });
  }
  next();
};

export default { contactValidator };
