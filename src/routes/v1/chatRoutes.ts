import express from 'express';
import { sendMessage } from '../../controller/chatController';

const router = express.Router();

router.post('/', sendMessage);

export default router;
