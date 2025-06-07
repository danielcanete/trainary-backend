import express from 'express';
import { addRoutine, getAllRoutines } from '../../controller/routineController';

const router = express.Router();

router.post('/add', addRoutine);
router.get('/', getAllRoutines);

export default router;
