import { consola } from 'consola';
import cookieParser from 'cookie-parser';
import express, { type Response } from 'express';
import router from './router/index.js';

const app = express();
const port = 8000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api', router);
app.get('/', (_request, response: Response) => {
  response.send('Hello World!');
});

app.listen(port, () => {
  consola.success(`http://localhost:${port}`);
});
