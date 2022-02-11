import { Sequelize, DataTypes } from 'sequelize';
import databaseConfig from '../config/database';
import User from '../models/User';

const connection = new Sequelize(databaseConfig);
export const UserModel = User(connection, DataTypes);

// import { Sequelize, DataTypes } from 'sequelize';
// import databaseConfig from '../config/database';
// import User from '../models/User';

// console.log(User);
// const models = [User];

// models.forEach((model) => model(connection, DataTypes));
