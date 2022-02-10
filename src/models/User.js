import bcryptjs from 'bcryptjs';
import Sequelize from 'sequelize';

export default (sequelize) => {
  console.log(sequelize);
  const User = sequelize.define('user', {
    name: {
      type: Sequelize.STRING,
      defaultValue: '',
      validate: {
        len: {
          args: [3, 255],
          msg: 'Campo nome deve ter entre 3 e 255 caracteres',
        },
      },
    },
    email: {
      type: Sequelize.STRING,
      defaultValue: '',
      unique: {
        msg: 'Email já existe',
      },
      validate: {
        isEmail: {
          msg: 'Email inválido',
        },
      },
    },
    password_hash: {
      type: Sequelize.STRING,
      defaultValue: '',
    },
    password: {
      type: Sequelize.VIRTUAL,
      defaultValue: '',
      validate: {
        len: {
          args: [6, 50],
          msg: 'A senha precisa ter entre 6 e 50 caracteres',
        },
      },
    },
    isAdmin: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  }, {
    hooks: {
      beforeSave: async (user) => {
        if (user.password) {
          user.password_hash = await bcryptjs.hash(user.password, 8);
        }
      },
    },
    passwordIsValid(password) {
      return bcryptjs.compare(password, User.password_hash);
    },
  });
  return User;
};
