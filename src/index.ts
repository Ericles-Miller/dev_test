import 'reflect-metadata';
import express, {Request, Response, NextFunction} from 'express';
import { router } from './router';
import { initializeDatabase } from './database';
import { AppError } from './AppError';

const app = express();
app.use(express.json());

initializeDatabase();

app.use(router);


app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }
    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${err.message}`,
    });
  },
);




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


