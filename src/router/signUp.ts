import { type Request, type Response, type NextFunction } from 'express';
import signUp from '@/service/signUp';

export default [
  async (request: Request, response: Response, next: NextFunction) => {
    const { email, password } = request;
    try {
      const data = await signUp({ email, password });
      response.status(201).json(data);
    } catch (error) {
      next(error);
    }
  },
];
