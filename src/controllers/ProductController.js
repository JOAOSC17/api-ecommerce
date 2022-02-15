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
  index: async (req, res) => {
    try {
      const products = await ProductModel.findAll({ attributes: ['id', 'title', 'description', 'price'] });
      return res.json(products);
    } catch (e) {
      return res.status(500).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  },
  show: async (req, res) => {
    try {
      const product = await ProductModel.findByPk(req.params.id);

      if (!product) {
        return res.status(404).json({
          errors: ['Produto não encontrado'],
        });
      }
      const {
        id, title, description, price,
      } = product;
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
