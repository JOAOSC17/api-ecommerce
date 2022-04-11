import express from 'express';
import cors from 'cors';
import { resolve } from 'path';
import UserRoutes from './routes/UserRoutes';
import './database';
import LoginRoutes from './routes/LoginRoutes';
import ProductRoutes from './routes/ProductRoutes';
import OrderRoutes from './routes/OrderRoutes';
import PaymentRoutes from './routes/PaymentRoutes';
import PhotoRoutes from './routes/PhotoRoutes';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(resolve(__dirname, 'uploads')));

app.use('/users', UserRoutes);
app.use('/login', LoginRoutes);
app.use('/products', ProductRoutes);
app.use('/orders', OrderRoutes);
app.use('/payment', PaymentRoutes);
app.use('/photos', PhotoRoutes);
export default app;
