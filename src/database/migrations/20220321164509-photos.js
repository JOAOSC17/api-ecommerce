module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('photos', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    originalname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    filename: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    product_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'products',
        key: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  }),
  down: (queryInterface) => queryInterface.dropTable('photos'),
};
