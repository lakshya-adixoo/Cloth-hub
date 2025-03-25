import express from 'express';
import { connection } from './src/datasource/connect.database.js'
import router from './src/view/routes.js';
import cors from 'cors'

const app = express()
const port = 3000


app.use(cors());
app.use(express.json()); 
app.use(router); 


const startServer = async () => {
    await connection(); 
    app.use(router);
  
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  };
  
  startServer();