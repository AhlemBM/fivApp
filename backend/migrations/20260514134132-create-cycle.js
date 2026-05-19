'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cycles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      startDate: {
        type: Sequelize.DATE
      },
      cycleLength: {
        type: Sequelize.INTEGER
      },
      isRegular: {
        type: Sequelize.BOOLEAN
      },
      currentPhase: {
        type: Sequelize.STRING
      },
      nextAppointment: {
        type: Sequelize.DATE
      },
      hormones: {
        type: Sequelize.STRING
      },
      notes: {
        type: Sequelize.TEXT
      },
      remindersEnabled: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('Cycles');
  }
};