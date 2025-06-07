import { OPEN_ROUTER_CONFIG } from '@/services/openrouter/config';
import { Request, Response } from 'express';

export const sendMessage = async (req: Request, res: Response) => {
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
};
