import { OrderModel, ProductModel } from '../database';

const OrderController = {
  store: async (req, res) => {
    const {
      productsId,
    } = req.body;

    const user_id = req.userId;

    try {
      const products = await Promise.all(productsId.map((i) => ProductModel.findByPk(i)));
      const totalPrice = products.map((product) => product.price).reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        0,
      );
      console.log(products);
      const { id } = await OrderModel.create({ user_id, totalPrice });
      const order = await OrderModel.findOne({ where: { id } });
      await Promise.all(products.map((product) => order.addProduct(product.id)));
      const orderWithProducts = await OrderModel.findByPk(
        id,
        {
          attributes: ['id', 'user_id', 'totalPrice'],
          order: [['id', 'DESC'], [ProductModel, 'id', 'DESC']],
          include: {
            model: ProductModel,
            attributes: ['title', 'description', 'price'],
          },
        },
      );
      return res.status(200).json(orderWithProducts);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  },
};
export default OrderController;
