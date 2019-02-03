import models from "../../database/models";
import fs from 'fs';
import jwtDecode from "jwt-decode";

const changeRole = async (req, res) => {
  const { params: { email }, body: { role } } =req;
  const {headers: {authorization}} = req;
  const decode = jwtDecode(authorization);
  const { email: sessionEmail } = decode;
  await models.User.update({ role},{
    where : {
      email
    }
  });
  const logger = fs.createWriteStream('log.txt', {
    flags: 'a'
  });
  logger.write(`\r\n ${sessionEmail} granted ${email} ${role} role at ${new Date()}`);
  res.status(201).json({
    message: 'success'
  })
};

export default { changeRole };