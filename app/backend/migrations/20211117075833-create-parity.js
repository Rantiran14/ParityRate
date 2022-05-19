'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Parities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      hotelName: {
        type: Sequelize.STRING
      },
      url: {
        type: Sequelize.TEXT
      },
      vendor: {
        type: Sequelize.STRING
      },
      checkinDate: {
        type: Sequelize.DATE
      },
      checkoutDate: {
        type: Sequelize.DATE
      },
      guest: {
        type: Sequelize.INTEGER
      },
      stays: {
        type: Sequelize.INTEGER
      },
      roomType: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      sourceFile: {
        type: Sequelize.STRING
      },
      sourcePath: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Parities');
  }
};