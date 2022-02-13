import bcryptjs from 'bcryptjs';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    name: {
      type: DataTypes.STRING,
      defaultValue: '',
      validate: {
        len: {
          args: [3, 255],
          msg: 'Campo nome deve ter entre 3 e 255 caracteres',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
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
      type: DataTypes.STRING,
      defaultValue: '',
    },
    password: {
      type: DataTypes.VIRTUAL,
      defaultValue: '',
      validate: {
        len: {
          args: [6, 50],
          msg: 'A senha precisa ter entre 6 e 50 caracteres',
        },
      },
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
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
  });
  return User;
};
