import express from 'express';
import UserRoutes from './src/routes/UserRoutes';
// import './src/database';
import LoginRoutes from './src/routes/LoginRoutes';
import ProductRoutes from './src/routes/ProductRoutes';
import OrderRoutes from './src/routes/OrderRoutes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', UserRoutes);
app.use('/login', LoginRoutes);
app.use('/products', ProductRoutes);
app.use('/orders', OrderRoutes);
export default app;
