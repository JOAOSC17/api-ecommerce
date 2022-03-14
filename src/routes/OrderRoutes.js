import express from 'express';
import OrderController from '../controllers/OrderController';
import { verifyToken } from '../middlewares/loginRequired';

const route = express.Router();
route.post('/', verifyToken, OrderController.store);
export default route;
