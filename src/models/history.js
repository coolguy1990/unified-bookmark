'use strict';
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('history', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    last_updated: {
      type: DataTypes.STRING
    }
  }, {
    tableName: 'history',
    paranoid: true,
    freezeTableName: true,
    timestamps: true
  });
};
