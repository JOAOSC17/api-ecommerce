import express from 'express';
import UserController from '../controllers/UserController';

const route = express.Router();
route.post('/', UserController.store);
route.get('/', UserController.index);
export default route;
