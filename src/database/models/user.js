export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      fullName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      occupation: {
        allowNull: true,
        type: DataTypes.STRING
      },
      gender: {
        allowNull: false,
        type: DataTypes.ENUM('male', 'female')
      },
      password: {
        allowNull: false,
        type: DataTypes.TEXT
      }
    },
    {}
  );
  User.prototype.toJSON =  function () {
    const values = Object.assign({}, this.get());

    delete values.password;
    return values;
  };
  return User;
};
