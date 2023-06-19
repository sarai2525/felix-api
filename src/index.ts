import express, {type Response} from 'express';
import {consola} from 'consola';

const app = express();
const port = 8000;
app.use(express.json());

app.get('/', (_request, response: Response) => {
  response.send('Hello World!');
});

app.listen(port, () => {
  consola.success(`http://localhost:${port}`);
});
