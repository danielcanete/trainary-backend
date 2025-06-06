import 'dotenv/config';
import express from 'express';
import { clerkClient, requireAuth, getAuth } from '@clerk/express';

const app = express();
const PORT = process.env.PORT || 5002;
const API_URL = process.env.API_URL || '';


app.get('/protected', requireAuth(), async (req, res) => {
  // Use `getAuth()` to get the user's `userId`
  const { userId } = getAuth(req)

  // Use Clerk's JavaScript Backend SDK to get the user's User object
  const user = await clerkClient.users.getUser(userId)

  return res.json({ user })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${API_URL}:${PORT}`);
});
