'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.query(
    `ALTER TABLE "Users" ADD COLUMN password VARCHAR`
  ),

  down: (queryInterface, Sequelize) => queryInterface.sequelize.query(
    `ALTER TABLE Users 
DROP COLUMN password`
  )
};
