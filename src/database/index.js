// import bcryptjs from 'bcryptjs';
import { Sequelize, DataTypes } from 'sequelize';
import databaseConfig from '../config/database';
import Order from '../models/Order';
import OrderProduct from '../models/OrderProduct';
import Product from '../models/Product';
import User from '../models/User';

const connection = new Sequelize(databaseConfig);
export const UserModel = User(connection, DataTypes);
export const ProductModel = Product(connection, DataTypes);
export const OrderModel = Order(connection, DataTypes);
export const OrderProductModel = OrderProduct(connection, DataTypes);
UserModel.associate = function () {
  UserModel.hasMany(OrderModel, {
    foreignKey: 'user_id',
    as: 'orders',
  });
};
ProductModel.associate = function () {
  ProductModel.belongsToMany(OrderModel, {
    through: OrderProductModel,
    foreignKey: 'product_id',
    as: 'orders',
  });
};
OrderModel.associate = function () {
  OrderModel.belongsTo(UserModel, {
    foreignKey: 'user_id',
    as: 'users',
  });
};
OrderModel.associate = function () {
  OrderModel.belongsToMany(ProductModel, {
    through: OrderProductModel,
    foreignKey: 'order_id',
    as: 'products',
  });
};
