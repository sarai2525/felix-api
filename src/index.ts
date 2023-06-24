import express, { type Response } from 'express';
import { consola } from 'consola';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import router from './router/index';

const app = express();
const port = 8000;
app.use(express.json());

// TODO: figure out how to fix: eslint-disable-next-line @typescript-eslint/no-unsafe-call
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use('/api', router);
app.get('/', (_request, response: Response) => {
  response.send('Hello World!');
});

app.listen(port, () => {
  consola.success(`http://localhost:${port}`);
});
