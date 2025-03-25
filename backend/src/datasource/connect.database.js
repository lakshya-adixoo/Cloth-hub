import { Sequelize } from 'sequelize';
import { createUserModel } from '../model/userSchema.js';

const sequelize = new Sequelize('ecommerce', 'postgres', 'root', {
  host: 'localhost',
  dialect: 'postgres',
});

let UserModel = null;

const connection = async () => {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully');
      UserModel = createUserModel(sequelize);
      await sequelize.sync();
      console.log('Database synced');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  };

export { connection, UserModel };