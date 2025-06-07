import { addRoutine, getAllRoutines } from '@/controller/routineController';
import express from 'express';

const router = express.Router();

router.post('/add', addRoutine);
router.get('/', getAllRoutines);

export default router;
