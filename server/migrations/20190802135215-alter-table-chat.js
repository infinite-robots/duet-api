

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
        'Chats',
        'sender_id',
        Sequelize.INTEGER
    )
  },
  down: (queryInterface, Sequelize) => {
  }
};
