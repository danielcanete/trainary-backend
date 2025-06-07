import express from 'express';
import chatRoutes from './chatRoutes';
import routineRoutes from './routineRoutes';

const router = express.Router();

// Root API v1 endpoint
router.get('/', (req, res) => {
  res.send('Welcome to API v1');
});

// Mount sub-routers
router.use('/routines', routineRoutes);
router.use('/chat', chatRoutes);

export default router;
