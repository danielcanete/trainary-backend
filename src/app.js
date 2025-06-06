import 'dotenv/config';
import express from 'express';
import { clerkClient, requireAuth, getAuth } from '@clerk/express';

const PORT = process.env.PORT || 5002;
const API_URL = process.env.API_URL || '';
const OPEN_ROUTER_API_KEY = process.env.OPEN_ROUTER_API_KEY || '';

const app = express();
app.use(express.json());

app.get('/protected', requireAuth(), async (req, res) => {
  // Use `getAuth()` to get the user's `userId`
  const { userId } = getAuth(req)

  // Use Clerk's JavaScript Backend SDK to get the user's User object
  const user = await clerkClient.users.getUser(userId)

  return res.json({ user })
})


app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;

  if (!OPEN_ROUTER_API_KEY) {
    return res.status(500).json({ error: 'API key is not set' });
  }

  if (!Array.isArray(messages)) {
    return res.status(400).json({ error: 'Missing or invalid "messages" array' });
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPEN_ROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemma-3-1b-it:free',
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${API_URL}:${PORT}`);
});
