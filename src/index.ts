import 'reflect-metadata';
import express from 'express';
import { router } from './router';
import { initializeDatabase } from './database';

const app = express();
app.use(express.json());

initializeDatabase();

app.use(router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


