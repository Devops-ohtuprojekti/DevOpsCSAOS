const sequelize = require('sequelize')

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('Categories', {
      id: {
        allowNull: false,
        default: sequelize.fn('uuid_generate_v4'),
        primaryKey: true,
        type: DataTypes.UUID,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    })
  },
  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('Categories')
  },
}
