import { ProductModel } from "../datasource/connect.database.js";


export const getProduct = async (req, res) => {
    try {
      if (!ProductModel) {
        throw new Error('ProductModel is not initialized');
      }
  
      const products = await ProductModel.findAll();
  
      return res.status(200).json({ success: true  , Products : products});
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
        err,
      });
    }
  };


  export const addProduct = async (req, res) => {
    const { title, price, description, category, image, rating_rate, rating_count } = req.body;
  
    try {
      if (!ProductModel) {
        throw new Error('ProductModel is not initialized');
      }
  
      const newProduct = await ProductModel.create({
        title,
        price,
        description,
        category,
        image,
        rating_rate,
        rating_count
      });
  
      return res.status(201).json({
        success: true,
        message: 'Product added successfully',
        product: newProduct
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
        err,
      });
    }
  };