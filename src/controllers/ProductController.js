import { PhotoModel, ProductModel } from '../database';

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
      const products = await ProductModel.findAll({
        attributes: ['id', 'title', 'description', 'price'],
        include: {
          model: PhotoModel,
          attributes: ['id', 'originalname', 'url']
        },
      });
      return res.json(products);
    } catch (e) {
      // return res.status(500).json({
      //   errors: e.errors.map((err) => err.message),
      // });
      console.log(e);
    }
  },
  show: async (req, res) => {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: ['ID não enviado.'],
        });
      }
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
  update: async (req, res) => {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: ['ID não enviado.'],
        });
      }
      const product = await ProductModel.findByPk(req.params.id);
      if (!product) {
        return res.status(404).json({
          errors: ['Produto não encontrado'],
        });
      }
      const newData = await product.update(req.body);
      const {
        id, title, description, price,
      } = newData;
      return res.json({
        id, title, description, price,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  },
  delete: async (req, res) => {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: ['ID não enviado.'],
        });
      }

      const product = await ProductModel.findByPk(req.params.id);

      if (!product) {
        return res.status(400).json({
          errors: ['Produto não existe'],
        });
      }

      await product.destroy();
      return res.json(product);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  },
};
export default ProductController;
