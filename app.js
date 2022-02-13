import express from 'express';
import UserRoutes from './src/routes/UserRoutes';
// import './src/database';
import LoginRoutes from './src/routes/LoginRoutes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', UserRoutes);
app.use('/login', LoginRoutes);
export default app;
