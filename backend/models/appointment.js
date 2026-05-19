'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Appointment.belongsTo(models.Cycle, {
        foreignKey: 'cycleId',
        as: 'cycle'
      });
    }
  }
  Appointment.init({
    cycleId: DataTypes.INTEGER,
    appointmentDate: DataTypes.DATE,
    doctorName: DataTypes.STRING,
    notes: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Appointment',
  });
  return Appointment;
};