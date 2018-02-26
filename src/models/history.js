'use strict';
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('history', {
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
