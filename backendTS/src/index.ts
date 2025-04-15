import express, { Application } from 'express';
import { connection } from './datasource/connect.database'; 
import cors from 'cors';
import UserRouter from './view/routes'
import ProductRoutes from './view/productRoutes'

const app: Application = express();
const port: number = 3000;

app.use(cors());
app.use(express.json());
app.use(UserRouter);
app.use(ProductRoutes);

const startServer = async (): Promise<void> => {
  try {
    await connection();
    app.use(UserRouter);
    app.use(ProductRoutes);
    console.log('Database connected successfully.');

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });

  } catch (error) {
    console.error('Failed to connect to the database:', error);
  }
};

startServer();
