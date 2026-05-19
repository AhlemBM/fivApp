'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cycle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Cycle belongs to User
      Cycle.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });

      // Cycle has many Medications
      Cycle.hasMany(models.Medication, {
        foreignKey: 'cycleId',
        as: 'medications',
        onDelete: 'CASCADE'
      });

      // Cycle has many Appointments
      Cycle.hasMany(models.Appointment, {
        foreignKey: 'cycleId',
        as: 'appointments',
        onDelete: 'CASCADE'
      });
    }
  }
  Cycle.init({
    userId: DataTypes.INTEGER,
    startDate: DataTypes.DATE,
    cycleLength: DataTypes.INTEGER,
    isRegular: DataTypes.BOOLEAN,
    currentPhase: DataTypes.STRING,
    nextAppointment: DataTypes.DATE,
    hormones: DataTypes.STRING,
    notes: DataTypes.TEXT,
    remindersEnabled: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Cycle',
  });
  return Cycle;
};