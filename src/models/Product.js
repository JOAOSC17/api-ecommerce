export default (sequelize, DataTypes) => sequelize.define('product', {
  title: {
    type: DataTypes.STRING,
    defaultValue: '',
    validate: {
      len: {
        args: [3, 255],
        msg: 'Campo title deve ter entre 3 e 255 caracteres',
      },
    },
  },
  description: {
    type: DataTypes.STRING,
    defaultValue: '',
    validate: {
      len: {
        args: [3, 1000],
        msg: 'Campo description deve ter entre 3 e 1000 caracteres',
      },
    },
  },
  price: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
    validate: {
      isFloat: {
        msg: 'Price precisa ser um número inteiro ou de ponto flutuante',
      },
    },
  },
}, {});
