'use strict';
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('bookmark', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    title: {
      type: DataTypes.STRING
    },
    url: {
      type: DataTypes.TEXT
    },
    favicon: {
      type: DataTypes.TEXT
    },
    folder: {
      type: DataTypes.STRING
    },
    type: {
      type: DataTypes.STRING
    },
    bookmark_id: {
      type: DataTypes.INTEGER
    },
    sync_transaction_version: {
      type: DataTypes.INTEGER
    },
    date_added: {
      type: DataTypes.STRING,
      get () {
        return +this.getDataValue('date_added');
      },
      set (val) {
        this.setDataValue('date_added', ''+val);
      }
    },
    date_modified: {
      type: DataTypes.STRING,
      get () {
        return +this.getDataValue('date_modified');
      },
      set (val) {
        this.setDataValue('date_modified', ''+val);
      }
    }
  }, {
    tableName: 'bookmark',
    paranoid: true,
    freezeTableName: true,
    timestamps: true
  });
};
