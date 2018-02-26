module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('bookmark', {
      id: Sequelize.INTEGER,
      uuid: Sequelize.UUID,
      title: Sequelize.STRING,
      url: Sequelize.TEXT,
      favicon: Sequelize.TEXT,
      bookmark_id: Sequelize.INTEGER,
      type: Sequelize.STRING,
      date_added: Sequelize.STRING,
      date_modified: Sequelize.STRING,
      folder: Sequelize.STRING,
      sync_transaction_version: Sequelize.INTEGER,
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('bookmark');
  }
};
