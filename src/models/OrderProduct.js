export default (sequelize, DataTypes) => {
  const OrdersProducts = sequelize.define('orders_products', {
    order_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    quantity_buyed: DataTypes.INTEGER,
    product_price: DataTypes.DECIMAL,
  }, {
  });
  return OrdersProducts;
};
