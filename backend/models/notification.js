'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    static associate(models) {
      Notification.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
    }
  }

  Notification.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('cycle', 'appointment', 'medication'),
      allowNull: false
    },
    priority: {
      type: DataTypes.ENUM('normal', 'high', 'urgent'),
      defaultValue: 'normal'
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isDismissed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    // Référence flexible selon le type
    referenceId: {
      type: DataTypes.INTEGER,
      allowNull: true   // id du Cycle, Appointment ou Medication
    },
    referenceType: {
      type: DataTypes.STRING,
      allowNull: true   // 'Cycle' | 'Appointment' | 'Medication'
    },
    // Métadonnées JSON libres (phase, cycleDay, timeSlot…)
    meta: {
      type: DataTypes.JSON,
      defaultValue: {}
    },
    // Pour le snooze médicament
    snoozedUntil: {
      type: DataTypes.DATE,
      allowNull: true
    },
    // Pour ne pas renvoyer deux fois la même notif le même jour
    scheduledFor: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Notification',
    tableName: 'Notifications',
    indexes: [
      { fields: ['userId'] },
      { fields: ['type'] },
      { fields: ['isRead'] },
      { fields: ['scheduledFor'] }
    ]
  });

  return Notification;
};