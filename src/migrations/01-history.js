module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('History', {
      id: Sequelize.INTEGER,
      uuid: Sequelize.UUID,
      last_updated: Sequelize.STRING,
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
    return queryInterface.dropTable('History');
  }
};
