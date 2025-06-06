import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/index.js';
import errorHandler from './middlewares/errorHandler.js';
import { connectToDatabase } from './db.js';
import authMiddleware from './middlewares/auth.js';

const app = express();
const PORT = process.env.PORT || 5002;

// Middleware
app.use(bodyParser.json());
app.use(authMiddleware);

// Connect to the database
connectToDatabase();

// Routes
app.use('/api', routes);

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
