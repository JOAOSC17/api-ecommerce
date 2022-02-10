import express from 'express';
import UserController from '../controllers/UserController';

const route = express.Router();
route.post('/', UserController.store);
export default route;
