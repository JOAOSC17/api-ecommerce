import express from 'express';
import cors from 'cors';
import UserRoutes from './src/routes/UserRoutes';
import './src/database';
import LoginRoutes from './src/routes/LoginRoutes';
import ProductRoutes from './src/routes/ProductRoutes';
import OrderRoutes from './src/routes/OrderRoutes';
import PaymentRoutes from './src/routes/PaymentRoutes';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', UserRoutes);
app.use('/login', LoginRoutes);
app.use('/products', ProductRoutes);
app.use('/orders', OrderRoutes);
app.use('/payment', PaymentRoutes);
export default app;
