import express from 'express';
import OrderController from '../controllers/OrderController';
import { verifyToken } from '../middlewares/loginRequired';

const route = express.Router();
route.post('/', verifyToken, OrderController.store);
route.get('/', OrderController.index);
route.get('/:id', verifyToken, OrderController.show);
export default route;
