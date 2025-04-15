import { Sequelize, DataTypes, Model, ModelStatic } from 'sequelize';


interface ProductAttributes {
  id?: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating_rate: number;
  rating_count: number;
}


export type ProductInstance = Model<ProductAttributes> & ProductAttributes;


export const createProductModel = (sequelize: Sequelize): ModelStatic<ProductInstance> => {
  const Product = sequelize.define<ProductInstance>('Product', {
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
