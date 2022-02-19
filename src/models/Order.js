export default (sequelize, DataTypes) => {
  const Order = sequelize.define('order', {
    user_id: DataTypes.INTEGER,
    total_price: DataTypes.DECIMAL,
  }, {
  });
  return Order;
};
