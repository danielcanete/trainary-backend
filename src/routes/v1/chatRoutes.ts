import { sendMessage } from '@/controller/chatController';
import express from 'express';

const router = express.Router();

router.post('/', sendMessage);

export default router;
