import models from "../../database/models";

const changeRole = async (req, res) => {
  const { params: { email }, body: { role } } =req;
  await models.User.update({ role},{
    where : {
      email
    }
  });
  res.status(201).json({
    message: 'success'
  })
};

export default { changeRole };