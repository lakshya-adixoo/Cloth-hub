import express from "express";
import { getProduct , addProduct , updateProduct , deleteProduct } from "../controller/productController.js";


const router = express.Router();

router.get("/getProduct" , getProduct);
router.post("/addProduct" , addProduct);
router.put('/updateProduct/:id', updateProduct);
router.delete('/deleteProduct/:id', deleteProduct);

export default router; 
