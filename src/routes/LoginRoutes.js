import express from 'express';
import LoginController from '../controllers/LoginController';

const route = express.Router();
route.post('/', LoginController);
export default route;
