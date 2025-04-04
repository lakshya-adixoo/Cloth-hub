import express from 'express';
import { connection } from './src/datasource/connect.database.js'
import UserRouter from './src/view/routes.js';
import cors from 'cors'
import productRouter from './src/view/productRoutes.js'

const app = express()
const port = 3000


app.use(cors());
app.use(express.json()); 
app.use(UserRouter); 
app.use(productRouter);


const startServer = async () => {
    await connection(); 
    app.use(UserRouter);
    app.use(productRouter);
  
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  };
  
  startServer();