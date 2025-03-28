import express from 'express';
import { connection } from './src/datasource/connect.database.js'
import router from './src/view/routes.js';
import cors from 'cors'
import path from "path";
import { fileURLToPath } from "url";

const app = express()
const port = 3000


app.use(cors());
app.use(express.json()); 
app.use(router); 



// Equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../../frontend/dist")));


const startServer = async () => {
    await connection(); 
    app.use(router);
  
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  };
  
  startServer();