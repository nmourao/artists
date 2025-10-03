import { Router } from 'express';
import {
  buildArtistOverview,
  findArtistById,
  getServicesForArtist,
  listArtistsWithSummaries,
  buildArtistMetricsSnapshot
} from '../services/aggregationService.js';
import { getDashboard, updateDashboard } from '../services/dashboardService.js';
import { updateArtistProfile } from '../services/profileService.js';

const router = Router();

router.get('/', (req, res) => {
  res.json({ data: listArtistsWithSummaries() });
});

router.get('/:artistId', (req, res) => {
  const overview = buildArtistOverview(req.params.artistId);
  if (!overview) {
    res.status(404).json({ error: 'Artist not found' });
    return;
  }

  res.json({ data: overview });
});

router.get('/:artistId/services', (req, res) => {
  const artist = findArtistById(req.params.artistId);
  if (!artist) {
    res.status(404).json({ error: 'Artist not found' });
    return;
  }

  const services = getServicesForArtist(artist).map((service) => ({
    id: service.id,
    name: service.name,
    metrics: service.metrics,
    audience: service.audience,
    topContent: service.topContent,
    trends: service.trends
  }));

  res.json({ data: services });
});

router.get('/:artistId/metrics', (req, res) => {
  const { start, end } = req.query;

  const parseDateParam = (value) => {
    if (value === undefined) return null;
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) {
      return { error: `Invalid date value "${value}". Use ISO format (YYYY-MM-DD).` };
    }
    return { date: parsed };
  };

  const startResult = parseDateParam(start);
  if (startResult?.error) {
    res.status(400).json({ error: startResult.error });
    return;
  }

  const endResult = parseDateParam(end);
  if (endResult?.error) {
    res.status(400).json({ error: endResult.error });
    return;
  }

  if (startResult?.date && endResult?.date && startResult.date > endResult.date) {
    res.status(400).json({ error: 'The start date must be before or equal to the end date.' });
    return;
  }

  const snapshot = buildArtistMetricsSnapshot(req.params.artistId, {
    startDate: startResult?.date ?? null,
    endDate: endResult?.date ?? null
  });

  if (!snapshot) {
    res.status(404).json({ error: 'Artist not found' });
    return;
  }

  res.json({ data: snapshot });
});

router.get('/:artistId/dashboard', (req, res) => {
  const { dashboard, error } = getDashboard(req.params.artistId);
  if (error) {
    res.status(404).json({ error });
    return;
  }

  res.json({ data: dashboard });
});

router.put('/:artistId/dashboard', (req, res) => {
  const { dashboard, error } = updateDashboard(req.params.artistId, req.body ?? {});
  if (error) {
    const status = Array.isArray(error) ? 400 : 404;
    res.status(status).json({ error });
    return;
  }

  res.json({ data: dashboard });
});

router.put('/:artistId/profile', (req, res) => {
  const { artist, error } = updateArtistProfile(req.params.artistId, req.body ?? {});
  if (error) {
    const status = Array.isArray(error) ? 400 : 404;
    res.status(status).json({ error });
    return;
  }

  res.json({ data: buildArtistOverview(artist.id) });
});

export default router;
