import { ProductModel } from '../database';

const ProductController = {
  store: async (req, res) => {
    try {
      const newProduct = await ProductModel.create(req.body);
      const {
        id, title, description, price,
      } = newProduct;
      return res.json({
        id, title, description, price,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  },
};
export default ProductController;
