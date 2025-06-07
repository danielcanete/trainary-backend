import { requireAuth } from '@clerk/express';
import 'dotenv/config';
import express from 'express';
import 'module-alias/register';
import { rootController } from './controller/rootController';
import apiV1Router from './routes/v1';

const PORT = process.env.PORT || 5002;
const API_URL = process.env.API_URL || '';

const app = express();
app.use(express.json());

app.get('/', rootController);

// Mount the API v1 router with authentication middleware
app.use('/api/v1', requireAuth({ signInUrl: '/' }), apiV1Router);

app.listen(Number(PORT), () => {
  console.log(`Server is running on ${API_URL}:${PORT}`);
});
