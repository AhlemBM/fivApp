'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class EmotionalContent extends Model {

    static associate(models) {}
  }

  EmotionalContent.init({

    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [[
          'comfort',
          'medical_info',
          'meditation',
          'dua',
          'silence',
          'talk'
        ]]
      }
    },

    title: {
      type: DataTypes.STRING,
      allowNull: true
    },

    content: {
      type: DataTypes.TEXT,
      allowNull: false
    }

  }, {
    sequelize,
    modelName: 'EmotionalContent',
    tableName: 'emotionalcontents'
  });

  return EmotionalContent;
};