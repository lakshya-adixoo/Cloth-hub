import { Request, Response } from 'express';
import { ProductModel } from '../datasource/connect.database';
import { ProductInstance } from '../model/productSchema';



export const getProduct = async (req: Request, res: Response): Promise<any> => {
  try {
    if (!ProductModel) {
      throw new Error('ProductModel is not initialized');
    }

    const products = await ProductModel.findAll();

    return res.status(200).json({ success: true, products });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      err,
    });
  }
};



export const addProduct = async (req: Request, res: Response): Promise<any> => {
  const { title, price, description, category, image, rating_rate, rating_count } = req.body;

  try {
    if (!ProductModel) {
      throw new Error('ProductModel is not initialized');
    }

    const newProduct: ProductInstance = await ProductModel.create({
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



export const deleteProduct = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const deleted = await ProductModel!.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error', err });
  }
};



export const updateProduct = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const [updated] = await ProductModel!.update(req.body, { where: { id } });

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Product not found or no changes applied' });
    }

    const updatedProduct = await ProductModel!.findOne({ where: { id } });

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      product: updatedProduct
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false, message: 'Internal server error', err });
  }
};
