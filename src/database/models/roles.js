'use strict';
module.exports = (sequelize, DataTypes) => {
  const Roles = sequelize.define('Roles', {
    id: {
      primaryKey:true,
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Roles.associate = function(models) {
    Roles.belongsToMany(models.User, {
      foreignKey: 'roleId',
      as: 'users',
      through: 'roles'
    });
  };
  return Roles;
};