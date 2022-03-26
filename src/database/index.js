import { Sequelize, DataTypes } from 'sequelize';
import databaseConfig from '../config/database';
import Order from '../models/Order';
import OrderProduct from '../models/OrderProduct';
import Photo from '../models/Photo';
import Product from '../models/Product';
import User from '../models/User';

export const connection = new Sequelize(databaseConfig);
export const UserModel = User(connection, DataTypes);
export const ProductModel = Product(connection, DataTypes);
export const OrderModel = Order(connection, DataTypes);
export const OrderProductModel = OrderProduct(connection, DataTypes);
export const PhotoModel = Photo(connection, DataTypes);
UserModel.associate = function () {
  UserModel.hasMany(OrderModel, {
    foreignKey: 'user_id',
    as: 'orders',
  });
};
ProductModel.associate = function () {
  ProductModel.belongsTo(OrderModel, {
    foreignKey: 'order_id',
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
  OrderModel.hasMany(ProductModel, {
    through: OrderProductModel,
  });
};
PhotoModel.associate = function () {
  PhotoModel.belongsTo(ProductModel, {
    foreignKey: 'product_id',
  });
};
ProductModel.associate = function () {
  ProductModel.hasMany(PhotoModel, {
    foreignKey: 'product_id',
  });
};

OrderModel.belongsToMany(ProductModel, { through: OrderProductModel });
ProductModel.belongsToMany(OrderModel, { through: OrderProductModel });
