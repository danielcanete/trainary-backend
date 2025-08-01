import { getAuth } from '@clerk/express';
import { Request, Response } from 'express';
import { CHAT } from '../modules/chat/constants/chatConstants';
import { clearExtraMessages } from '../modules/chat/functions/clearExtraMessage';
import { OPEN_ROUTER_CONFIG } from '../services/openrouter/config';
import { saveChat } from '../services/upstash';

export const sendMessage = async (req: Request, res: Response) => {
  const { messages } = req.body;

  if (!OPEN_ROUTER_CONFIG.TOKEN) {
    return res.status(500).json({ error: 'API key is not set' });
  }

  if (!Array.isArray(messages)) {
    return res.status(400).json({ error: 'Missing or invalid "messages" array' });
  }

  const { userId } = getAuth(req)

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const messageWithPrompt = [CHAT.SYSTEM_PROMPT, ...messages];
  const messageWithoutExtras = clearExtraMessages(messageWithPrompt);
  const finalMessage = messageWithoutExtras;
  
  // TODO: temporal
  // res.status(200).json({
  //   message: 'Message processed successfully',
  // });

  await saveChat(userId, messageWithoutExtras)

  try {
    const response = await fetch(OPEN_ROUTER_CONFIG.API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPEN_ROUTER_CONFIG.TOKEN}`,
        'HTTP-Referer': OPEN_ROUTER_CONFIG.HTTP_REFERER,
        'X-Title': OPEN_ROUTER_CONFIG.X_TITLE,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: OPEN_ROUTER_CONFIG.MODEL_NAME,
        messages: finalMessage,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: errorText });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
