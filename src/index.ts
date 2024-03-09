import dotenv from 'dotenv';
import app from './app';

// Load environment variables from .env file
dotenv.config();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
