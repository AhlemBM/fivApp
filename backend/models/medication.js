'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Medication extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Medication.belongsTo(models.Cycle, {
        foreignKey: 'cycleId',
        as: 'cycle'
      });
    }
  }
  Medication.init({
    cycleId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    dosage: DataTypes.STRING,
    time: DataTypes.TIME,
    reminder: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Medication',
  });
  return Medication;
};