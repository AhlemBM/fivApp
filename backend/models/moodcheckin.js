'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MoodCheckin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MoodCheckin.init({
    userId: DataTypes.INTEGER,
    checkinDate: DataTypes.DATE,
    mood: DataTypes.STRING,
    stressLevel: DataTypes.INTEGER,
    thinkingAboutResult: DataTypes.STRING,
    pressureLevel: DataTypes.STRING,
    sleepQuality: DataTypes.STRING,
    supportSource: DataTypes.STRING,
    need: DataTypes.STRING,
    notes: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'MoodCheckin',
  });
  return MoodCheckin;
};