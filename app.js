import express from 'express';
import UserRoutes from './src/routes/UserRoutes';
import './src/database';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', UserRoutes);

export default app;
