'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Notifications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Users', key: 'id' },
        onDelete: 'CASCADE'
      },
      type: {
        type: Sequelize.ENUM('cycle', 'appointment', 'medication'),
        allowNull: false
      },
      priority: {
        type: Sequelize.ENUM('normal', 'high', 'urgent'),
        defaultValue: 'normal'
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      message: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      isRead: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      isDismissed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      referenceId: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      referenceType: {
        type: Sequelize.STRING,
        allowNull: true
      },
      meta: {
        type: Sequelize.JSON,
        defaultValue: {}
      },
      snoozedUntil: {
        type: Sequelize.DATE,
        allowNull: true
      },
      scheduledFor: {
        type: Sequelize.DATEONLY,
        allowNull: true
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

    // Index pour les requêtes fréquentes
    await queryInterface.addIndex('Notifications', ['userId']);
    await queryInterface.addIndex('Notifications', ['type']);
    await queryInterface.addIndex('Notifications', ['isRead']);
    await queryInterface.addIndex('Notifications', ['scheduledFor']);
    await queryInterface.addIndex('Notifications', ['userId', 'scheduledFor']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Notifications');
  }
};