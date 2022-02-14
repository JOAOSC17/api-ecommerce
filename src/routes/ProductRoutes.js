import express from 'express';
import { ProductModel } from '../database';

const route = express.Router();
route.post('/', async (req, res) => {
  try {
    const newProduct = await ProductModel.create(req.body);
    return res.json(newProduct);
  } catch (e) {
    return res.status(400).json({
      errors: e.errors.map((err) => err.message),
    });
  }
});
export default route;
