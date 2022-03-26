import express from 'express';
import { verifyTokenAndAdmin } from '../middlewares/loginRequired';
import PhotoController from '../controllers/PhotoController';

const route = express.Router();
route.post('/', verifyTokenAndAdmin, PhotoController.store);
// route.get('/', PhotoController.index);
// route.delete('/:id', PhotoController.delete);
export default route;
