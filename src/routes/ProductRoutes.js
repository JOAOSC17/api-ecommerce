import express from 'express';
import ProductController from '../controllers/ProductController';

const route = express.Router();
route.post('/', ProductController.store);
export default route;
