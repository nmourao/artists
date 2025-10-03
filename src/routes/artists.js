import { Router } from 'express';
import {
  buildArtistOverview,
  findArtistById,
  getServicesForArtist,
  listArtistsWithSummaries
} from '../services/aggregationService.js';
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
    name: service.name
  }));

  res.json({ data: services });
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
