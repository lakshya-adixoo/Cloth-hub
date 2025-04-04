import express from "express";
import { getProduct , addProduct } from "../controller/productController.js";


const router = express.Router();

router.get("/getProduct" , getProduct)
router.post("/addProduct" , addProduct)


export default router; 
