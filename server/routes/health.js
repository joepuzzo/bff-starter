import express from 'express';
import logger from 'winston';

const router = express.Router();

router.get('/health', (req, res) => {
  const status = { status: 'UP' };
  logger.info('Health', status);
  logger.debug('Health', status);
  return res.send(status);
});

export default router;