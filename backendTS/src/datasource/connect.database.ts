import { Sequelize } from 'sequelize';
import { createUserModel  } from '../model/userSchema'; 
import { createProductModel } from '../model/productSchema';


const sequelize = new Sequelize('ecommerce', 'postgres', 'root', {
  host: 'localhost',
  dialect: 'postgres',
});

let UserModel: ReturnType<typeof createUserModel> | null = null;
let ProductModel: ReturnType<typeof createProductModel> | null = null;

const connection = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully');

    UserModel = createUserModel(sequelize);
    ProductModel = createProductModel(sequelize);

    await sequelize.sync();
    console.log('Database synced');
    
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export { connection, sequelize, UserModel ,ProductModel};
