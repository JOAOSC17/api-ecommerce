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
UserModel.associate = () => {
  UserModel.hasMany(OrderModel, {
    foreignKey: 'user_id',
    as: 'orders',
  });
};
ProductModel.associate = () => {
  ProductModel.belongsTo(OrderModel, {
    foreignKey: 'order_id',
    as: 'orders',
  });
  ProductModel.hasMany(PhotoModel, {
    foreignKey: 'product_id',
  });
  ProductModel.belongsToMany(OrderModel, { through: OrderProductModel });
};

OrderModel.associate = () => {
  OrderModel.hasMany(ProductModel, {
    through: OrderProductModel,
  });
  OrderModel.belongsToMany(ProductModel, { through: OrderProductModel });
  OrderModel.belongsTo(UserModel, {
    foreignKey: 'user_id',
    as: 'users',
  });
};
PhotoModel.associate = () => {
  PhotoModel.belongsTo(ProductModel, {
    foreignKey: 'product_id',
  });
};
