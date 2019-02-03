'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Users', 'role', {
    type: Sequelize.ENUM('Super Administrator', 'Administrator', 'User'),
    allowNull: false,
    defaultValue: 'User'
  }),

  down: (queryInterface, Sequelize) => queryInterface.sequelize.query(
    `ALTER TABLE Users 
DROP COLUMN role`
  )
};
