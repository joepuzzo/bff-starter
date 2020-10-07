import express from 'express';
import cors from 'cors';
import path from 'path';

import health from './routes/health.js';
import fail from './routes/fail.js';
import errorHandler from './middleware/errorHandler.js';
import proxy from './middleware/proxy.js';

const createApp = ({ corsConfig }) => {
  // Create Express application
  const app = express();

  // Health endpoint
  app.use(health);

  // Fail endpoints
  app.use('/fail', fail);

  // Apply CORS to the endpoints
  app.use(cors(corsConfig));

  // Add error handler
  app.use(errorHandler);

  // Route for static content
  if (process.env.NODE_ENV === 'development') {
    // Route to dev server when developing
    app.use('/*', proxy('http://localhost:9000'));
  } else {
    // Routes for static content
    app.use(express.static(path.join(__dirname, '../client/build'), { redirect: false }));

    // Final catch-all route to index.html defined last
    app.get('/*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });
  }

  return app;
};

export default createApp;