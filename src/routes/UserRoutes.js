import express from 'express';
import UserController from '../controllers/UserController';

const route = express.Router();
route.post('/', UserController.store);
route.get('/', UserController.index);
route.get('/:id', UserController.show);
export default route;
