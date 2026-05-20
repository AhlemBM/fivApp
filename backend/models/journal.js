'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Journal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Journal.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
    }
  }
  Journal.init({
    userId: DataTypes.INTEGER,
    thought: DataTypes.TEXT,
    stress: DataTypes.TEXT,
    comfort: DataTypes.TEXT,
    selfNeed: DataTypes.TEXT,
    selfAdvice: DataTypes.TEXT,
    anxiety: DataTypes.TEXT,
    control: DataTypes.TEXT,
    strength: DataTypes.TEXT,
    support: DataTypes.TEXT,
    freeText: DataTypes.TEXT,
    day: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Journal',
  });
  return Journal;
};
