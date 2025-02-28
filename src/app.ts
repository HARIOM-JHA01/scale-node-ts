import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
// import compression from 'compression';
// import rateLimit from 'express-rate-limit';
// import routes from './routes/index';
// import errorHandler from './middlewares/errorHandler';
import logger from './config/logger';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
// app.use(compression());

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
//   message: 'Too many requests, please try again later.',
// });
// app.use(limiter);

// app.use('/api', routes);
// app.use(errorHandler);

app.use((req, res) => {
  logger.warn(`404 - ${req.originalUrl}`);
  res.status(404).json({ error: 'Route not found' });
});

export default app;
