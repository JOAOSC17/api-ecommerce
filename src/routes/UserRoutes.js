import express from 'express';
import UserController from '../controllers/UserController';

const route = express.Router();
route.post('/', UserController.store);
route.get('/', UserController.index);
route.get('/:id', UserController.show);
route.put('/:id', UserController.update);
route.delete('/:id', UserController.delete);
export default route;
