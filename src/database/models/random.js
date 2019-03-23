
module.exports = (sequelize, DataTypes) => {
  const Random = sequelize.define('Random', {
    name: {
      type: DataTypes.STRING,
    },
    clerk: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    }
  }, {});
  return Random;
};
