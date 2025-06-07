import { clerkClient, getAuth, requireAuth } from '@clerk/express';
import 'dotenv/config';
import express, { Request, Response } from 'express';
import { OPEN_ROUTER_CONFIG } from './services/openrouter/config';

const PORT = process.env.PORT || 5002;
const API_URL = process.env.API_URL || '';

const app = express();
app.use(express.json());

app.get('/protected', requireAuth(), async (req: Request, res: Response) => {
  const { userId } = getAuth(req);

  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const user = await clerkClient.users.getUser(userId);
    return res.json({ user });
  } catch (err) {
    console.error('Error fetching user:', err);
    return res.status(500).json({ error: 'Error fetching user info' });
  }
});

app.post('/api/chat', async (req: Request, res: Response) => {
  const { messages } = req.body;

  if (!OPEN_ROUTER_CONFIG.TOKEN) {
    return res.status(500).json({ error: 'API key is not set' });
  }

  if (!Array.isArray(messages)) {
    return res.status(400).json({ error: 'Missing or invalid "messages" array' });
  }

  try {
    const response = await fetch(OPEN_ROUTER_CONFIG.API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPEN_ROUTER_CONFIG.TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: OPEN_ROUTER_CONFIG.MODEL_NAME,
        messages,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: errorText });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(Number(PORT), () => {
  console.log(`Server is running on ${API_URL}:${PORT}`);
});
