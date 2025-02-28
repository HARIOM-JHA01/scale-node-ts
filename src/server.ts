import dotenv from 'dotenv';
import { createServer } from 'http';
import app from './app';
import logger from './config/logger';

dotenv.config();

const PORT = process.env.PORT || 5000;
const server = createServer(app);

server.listen(PORT, () => {
  logger.info(`🚀 Server running on http://localhost:${PORT}`);
});
