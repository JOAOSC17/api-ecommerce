import express from 'express';
import ProductController from '../controllers/ProductController';

const route = express.Router();
route.post('/', ProductController.store);
route.get('/', ProductController.index);
route.get('/:id', ProductController.show);
route.put('/:id', ProductController.update);
route.delete('/:id', ProductController.delete);

export default route;
