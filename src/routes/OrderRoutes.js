import express from 'express';
import { OrderModel, ProductModel, UserModel } from '../database';
import { verifyToken } from '../middlewares/loginRequired';

const route = express.Router();
route.post('/', verifyToken, async (req, res) => {
  const {
    products_id,
    quantity_buyed,
  } = req.body;

  const user_id = req.userId;

  try {
    // verify if user and his address exists
    const user = await UserModel.findByPk(user_id);

    if (!user) return res.status(400).json({ message: 'user not found' });

    // verify if all products exists and have enough stock
    const products = [];
    let errorProduct;
    for (let i = 0; i < products_id.length; i += 1) {
      const product = await ProductModel.findByPk(products_id[i]);

      if (!product) {
        errorProduct = `product id ${products_id[i]} not found`;
        break;
      }

      products.push(product);
    }

    if (errorProduct) return res.status(400).json({ message: errorProduct });
    console.log(products);
    // calculates total price
    let total_price = 0;
    for (let i = 0; i < products.length; i += 1) {
      total_price += Number(products[i].price) * Number(quantity_buyed[i]);
    }

    console.log(total_price);
    // create order
    const order = await OrderModel.create(
      {
        user_id,
        total_price: total_price.toFixed(2),
      },
      {
      },
    );
    // add products to order and subtract from stock
    for (let i = 0; i < products.length; i += 1) {
      await order.addProduct(products[i], {
        through: {
          quantity_buyed: quantity_buyed[i],
          product_price: products[i].price,
        },
      });
    }
    await order.save();
    return res.json(order);
  } catch (error) {
    console.log(error);
  }
  // addCart > (produto, order) => {findById na order e order.addProduct(product)}
});
export default route;
