'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('bands', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      genre: {
        type: Sequelize.STRING
      },
      song: {
        type: Sequelize.STRING
      },
      img: {
        type: Sequelize.STRING
      },
      audio: {
        type: Sequelize.STRING
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('bands');
  }
};
