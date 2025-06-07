import { Request, Response } from 'express';

export const addRoutine = (req: Request, res: Response) => {
  // Implementation for adding a routine
  res.status(201).json({ message: 'Routine added successfully', data: req.body });
};

export const getAllRoutines = (req: Request, res: Response) => {
  // Implementation for getting all routines
  res.status(200).json({ message: 'Get all routines' });
};
