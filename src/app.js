import * as dotenv from 'dotenv';
dotenv.config('../');
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import { connectionDB } from './database/connection.js';
import router from './routes/index.js';
import { migrationsExec } from './migrations/settings.migrations.js';
const app = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.set('PORT', process.env.PORT || 8001);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'assets')));

app.get('/', (_req, res) => {
  res.json({
    message: 'Hello from server',
  });
});

app.get('/api', (_req, res) => {
  res.json({
    message: 'Hello from server api',
  });
});

app.use('/api', router);

app.listen(app.get('PORT'), async () => {
  await connectionDB();
  console.log('server listen on port', app.get('PORT'));
  await migrationsExec();
});
