import dotenv from 'dotenv';
import app from './app';

dotenv.config();
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Backend is running on port ${port}.`);
});
