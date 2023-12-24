import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import  router  from './routes/routes.js';

config();

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(cors());

app.use('/api', router);

app.use((err, _, res, __) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const port = process.env.APP_PORT || 1000;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
