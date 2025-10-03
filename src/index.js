import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import artistsRouter from './routes/artists.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Artist Data Aggregator API',
    endpoints: {
      listArtists: '/artists',
      artistOverview: '/artists/:artistId',
      connectedServices: '/artists/:artistId/services',
      aggregatedMetrics: '/artists/:artistId/metrics',
      dashboardLayout: '/artists/:artistId/dashboard',
      updateProfile: '/artists/:artistId/profile'
    }
  });
});

app.use('/artists', artistsRouter);

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error('Unexpected error', err);
  res.status(500).json({ error: 'Internal server error' });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Artist Data Aggregator API listening on port ${port}`);
  });
}

export default app;
