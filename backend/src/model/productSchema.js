import { DataTypes } from 'sequelize';

export const createProductModel = (sequelize) => {
  const Product = sequelize.define('Product', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating_rate: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    rating_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return Product;
};
