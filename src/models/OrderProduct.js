import { OrderModel, ProductModel } from '../database';

export default (sequelize, DataTypes) => sequelize.define('orders_products', {
  order_id: {
    type: DataTypes.INTEGER,
    references: {
      model: OrderModel,
      key: 'id',
    },
  },
  product_id: {
    type: DataTypes.INTEGER,
    references: {
      model: ProductModel,
      key: 'id',
    },
  },
}, {
});
