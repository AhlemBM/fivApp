'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MoodCheckins', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      checkinDate: {
        type: Sequelize.DATE
      },
      mood: {
        type: Sequelize.STRING
      },
      stressLevel: {
        type: Sequelize.INTEGER
      },
      thinkingAboutResult: {
        type: Sequelize.STRING
      },
      pressureLevel: {
        type: Sequelize.STRING
      },
      sleepQuality: {
        type: Sequelize.STRING
      },
      supportSource: {
        type: Sequelize.STRING
      },
      need: {
        type: Sequelize.STRING
      },
      notes: {
        type: Sequelize.TEXT
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('MoodCheckins');
  }
};