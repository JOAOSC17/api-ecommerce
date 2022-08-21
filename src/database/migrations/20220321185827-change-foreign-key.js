module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.changeColumn(
    'photos',
    'product_id',
    {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    },
  ),
  down: () => {},
};
