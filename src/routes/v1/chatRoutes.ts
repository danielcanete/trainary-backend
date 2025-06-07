import { getMessages, sendMessage } from '@/controller/chatController';
import express from 'express';

const router = express.Router();

router.get('/', getMessages);
router.post('/', sendMessage);

export default router;
