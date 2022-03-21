export default (sequelize, DataTypes) => sequelize.define('order', {
  user_id: DataTypes.INTEGER,
  totalPrice: DataTypes.DECIMAL,
  paid: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
});
