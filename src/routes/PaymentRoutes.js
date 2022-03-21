import { Router } from 'express';
import Stripe from 'stripe';
import { config } from 'dotenv';
import { OrderModel } from '../database';

config();
const route = Router();
route.post('/', async (req, res) => {
  Stripe(process.env.STRIPE_KEY).charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: 'brl',
    },
    async (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        const order = await OrderModel.findByPk(req.body.id);
        await order.update({
          user_id: order.user_id,
          total_price: order.total_price,
          paid: true,
        });
        res.status(200).json(stripeRes);
      }
    },
  );
});
export default route;
