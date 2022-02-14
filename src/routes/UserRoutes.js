import express from 'express';
import UserController from '../controllers/UserController';
import { verifyTokenAndAuthorization } from '../middlewares/loginRequired';

const route = express.Router();
route.post('/', UserController.store);
route.get('/', UserController.index);
route.get('/:id', verifyTokenAndAuthorization, UserController.show);
route.put('/:id', UserController.update);
route.delete('/:id', UserController.delete);
export default route;
