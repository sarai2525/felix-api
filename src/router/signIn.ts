import {
  type Request,
  type Response,
  type NextFunction,
  response,
} from 'express';
import auth from '@/service/signIn';

export default [
  async (request: Request, response: Response, next: NextFunction) => {
    const { email, password } = request;
    try {
      const data = await auth({ email, password });
      response.status(200).json(data);
    } catch (error) {
      next(error);
    }
  },
];
