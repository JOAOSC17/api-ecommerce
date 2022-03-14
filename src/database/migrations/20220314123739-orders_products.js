module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('orders_products', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    order_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'orders', key: 'id' },
    },
    product_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'products', key: 'id' },
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  }),
  down: (queryInterface) => queryInterface.dropTable('orders_products'),
};
