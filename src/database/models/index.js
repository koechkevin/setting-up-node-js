import Sequelize from 'sequelize';

const sequelize  = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: 'postgres',
  }
);

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.')
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});

const User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  }
});

User.sync({force: true}).then(() => {
  // Table created
  return User.create({
    firstName: 'John',
    lastName: 'Hancock'
  });
});