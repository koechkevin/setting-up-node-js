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
        allowNull: true,
        type: DataTypes.STRING
      }
    },
    {}
  );
  return User;
};
