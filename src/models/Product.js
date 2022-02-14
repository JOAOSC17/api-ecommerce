export default (sequelize, DataTypes) => {
  const Product = sequelize.define('product', {
    title: {
      type: DataTypes.STRING,
      defaultValue: '',
      validate: {
        len: {
          args: [3, 255],
          msg: 'Campo nome deve ter entre 3 e 255 caracteres',
        },
      },
    },
    description: {
      type: DataTypes.STRING,
      defaultValue: '',
      validate: {
        len: {
          args: [3, 1000],
          msg: 'Campo nome deve ter entre 3 e 1000 caracteres',
        },
      },
    },
    price: {
      type: DataTypes.FLOAT,
      defaultValue: '',
      validate: {
        isFloat: {
          msg: 'Altura precisa ser um número inteiro ou de ponto flutuante',
        },
      },
    },
  }, {
    sequelize,
  });
  return Product;
};
