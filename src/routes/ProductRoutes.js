import express from 'express';
import ProductController from '../controllers/ProductController';
import verifyTokenAndAdmin from '../middlewares/loginRequired';

const route = express.Router();
route.post('/', verifyTokenAndAdmin, ProductController.store);
route.get('/', ProductController.index);
route.get('/:id', ProductController.show);
route.put('/:id', verifyTokenAndAdmin, ProductController.update);
route.delete('/:id', verifyTokenAndAdmin, ProductController.delete);

export default route;
