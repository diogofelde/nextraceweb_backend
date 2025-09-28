'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      username: { type: Sequelize.STRING, allowNull: false, unique: true },
      email: { type: Sequelize.STRING, allowNull: true, unique: true },
      matricula: { type: Sequelize.STRING, allowNull: true, unique: true },
      passwordHash: { type: Sequelize.STRING, allowNull: false },
      team: { type: Sequelize.STRING, allowNull: false },
      permissions: { type: Sequelize.ARRAY(Sequelize.STRING), allowNull: false },
      role: { type: Sequelize.STRING, allowNull: false, defaultValue: 'analista' },
      isActive: { type: Sequelize.BOOLEAN, defaultValue: true },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
  }
};
