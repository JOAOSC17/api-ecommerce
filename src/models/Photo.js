export default (sequelize, DataTypes) => {
  const Photo = sequelize.define('photo', {
    originalname: {
      type: DataTypes.STRING,
      defaultValue: '',
      validate: {
        notEmpty: {
          msg: 'Campo não pode ficar vazio.',
        },
      },
    },
    filename: {
      type: DataTypes.STRING,
      defaultValue: '',
      validate: {
        notEmpty: {
          msg: 'Campo não pode ficar vazio.',
        },
      },
    },
    url: {
      type: DataTypes.VIRTUAL,
      get() {
        return `http://localhost:${process.env.PORT || 3001}/images/${this.getDataValue('filename')}`;
      },
    },
    product_id: DataTypes.INTEGER,
  }, {
  });
  return Photo;
};
