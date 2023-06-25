import { type NextFunction, type Request, type Response } from 'express';
import signUp from '../service/signUp.js';

export default [
  async (request: Request, response: Response, next: NextFunction) => {
    const { email, password } = request.body;
    try {
      const data = await signUp({ email, password });
      response.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }
];
