'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class User extends Model {

    static associate(models) {
      // define association here
      User.hasMany(models.Cycle, {
        foreignKey: 'userId',
        as: 'cycles',
        onDelete: 'CASCADE'
      });
      User.hasMany(models.Comment, {
        foreignKey: 'userId',
        as: 'comments',
        onDelete: 'CASCADE'
      });
      User.hasMany(models.Journal, {
        foreignKey: 'userId',
        as: 'journals'
      });
    }


  }

  User.init({

    firstName: DataTypes.STRING,

    lastName: DataTypes.STRING,

    email: DataTypes.STRING,

    age: DataTypes.INTEGER,

    mdp: DataTypes.STRING,

    pregnancyTryDuration: DataTypes.STRING,

    isFirstIvf: DataTypes.BOOLEAN,

    previousAttempts: DataTypes.INTEGER,

    followDoctor: DataTypes.BOOLEAN,

    emotionalState: DataTypes.STRING,

    treatmentStatus: DataTypes.STRING,

    avatar: DataTypes.STRING,

    phone: DataTypes.STRING,

    currentStep: DataTypes.INTEGER,

    notificationsEnabled: DataTypes.BOOLEAN,

    language: DataTypes.STRING

  }, {
    sequelize,
    modelName: 'User',
  });

  return User;

};
