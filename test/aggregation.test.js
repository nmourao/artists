import test from 'node:test';
import assert from 'node:assert/strict';
import {
  aggregateAudienceInsights,
  aggregateContentPerformance,
  aggregateMetrics,
  buildArtistOverview,
  findArtistById,
  getServicesForArtist,
  listArtistsWithSummaries
} from '../src/services/aggregationService.js';

import { streamingServices } from '../src/data/mockServices.js';

test('findArtistById returns an existing artist', () => {
  const artist = findArtistById('artist-001');
  assert.ok(artist, 'Expected artist to be found');
  assert.equal(artist.name, 'Lumen Echo');
});

test('getServicesForArtist returns configured services', () => {
  const artist = findArtistById('artist-001');
  const services = getServicesForArtist(artist);
  const serviceIds = services.map((service) => service.id);
  assert.deepEqual(serviceIds.sort(), ['apple', 'spotify', 'tidal']);
});

test('aggregateMetrics sums streams, followers, revenue, and engagement', () => {
  const metrics = aggregateMetrics(streamingServices);
  assert.equal(metrics.streams, 1250000 + 840000 + 265000);
  assert.equal(metrics.followers, 48200 + 22500 + 7800);
  assert.equal(metrics.revenue, 34000 + 28500 + 13800);
  assert.deepEqual(metrics.engagement, {
    likes: 15200 + 9600 + 2800,
    comments: 830 + 410 + 190,
    shares: 1200 + 680 + 240
  });
});

test('aggregateAudienceInsights averages percentages and merges sets', () => {
  const audience = aggregateAudienceInsights(streamingServices);
  assert.equal(audience.ageGroups['18-24'], parseFloat(((0.32 + 0.27 + 0.22) / 3).toFixed(2)));
  assert.ok(audience.topLocations.includes('United States'));
  assert.ok(audience.interests.includes('Indie Pop'));
});

test('aggregateAudienceInsights ignores missing data when averaging', () => {
  const services = [
    { audience: { ageGroups: { '13-17': 0.12 } } },
    { audience: { ageGroups: {} } }
  ];

  const audience = aggregateAudienceInsights(services);
  assert.equal(audience.ageGroups['13-17'], 0.12);
});

test('aggregateContentPerformance merges unique content across services', () => {
  const content = aggregateContentPerformance(streamingServices);
  assert.ok(content.tracks.includes('Neon Dreams'));
  assert.ok(content.tracks.includes('Aurora'));
  assert.ok(content.playlists.includes('Indie Radar'));
});

test('buildArtistOverview returns aggregated data for artist', () => {
  const overview = buildArtistOverview('artist-001');
  assert.equal(overview.id, 'artist-001');
  assert.equal(overview.metrics.streams, 1250000 + 840000 + 265000);
  assert.equal(overview.content.tracks.length > 0, true);
});

test('listArtistsWithSummaries returns summary info', () => {
  const summaries = listArtistsWithSummaries();
  assert.equal(summaries.length, 1);
  assert.equal(summaries[0].id, 'artist-001');
});
