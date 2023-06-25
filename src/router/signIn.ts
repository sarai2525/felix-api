import { type NextFunction, type Request, type Response } from 'express';
import signIn from '../service/signIn.js';

export default [
  async (request: Request, response: Response, next: NextFunction) => {
    const { email, password } = request;
    try {
      const data = await signIn({ email, password });
      response.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
];
