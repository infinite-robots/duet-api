'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
        'people_interests',
        'viewed',
        Sequelize.BOOLEAN
    )
  },
  down: (queryInterface, Sequelize) => {
  }
};
