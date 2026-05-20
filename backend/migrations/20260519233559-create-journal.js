'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Journals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      thought: {
        type: Sequelize.TEXT
      },
      stress: {
        type: Sequelize.TEXT
      },
      comfort: {
        type: Sequelize.TEXT
      },
      selfNeed: {
        type: Sequelize.TEXT
      },
      selfAdvice: {
        type: Sequelize.TEXT
      },
      anxiety: {
        type: Sequelize.TEXT
      },
      control: {
        type: Sequelize.TEXT
      },
      strength: {
        type: Sequelize.TEXT
      },
      support: {
        type: Sequelize.TEXT
      },
      freeText: {
        type: Sequelize.TEXT
      },
      day: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('Journals');
  }
};