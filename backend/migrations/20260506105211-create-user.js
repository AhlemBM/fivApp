'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      firstName: {
        type: Sequelize.STRING,
        allowNull: false
      },

      lastName: {
        type: Sequelize.STRING,
        allowNull: false
      },

      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },

      mdp: {
        type: Sequelize.STRING,
        allowNull: false
      },

      age: {
        type: Sequelize.INTEGER
      },

      pregnancyTryDuration: {
        type: Sequelize.STRING
      },

      isFirstIvf: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },

      previousAttempts: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },

      followDoctor: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },

      emotionalState: {
        type: Sequelize.STRING
      },

      treatmentStatus: {
        type: Sequelize.STRING
      },

      avatar: {
        type: Sequelize.STRING
      },

      phone: {
        type: Sequelize.STRING
      },

      currentStep: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },

      notificationsEnabled: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },

      language: {
        type: Sequelize.STRING,
        defaultValue: 'ar'
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};