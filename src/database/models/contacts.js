export default (sequelize, DataTypes) => {
  const Contacts = sequelize.define('Contacts', {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Name cannot be empty'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    message: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.TEXT
    }
  }, {});
  return Contacts;
};
