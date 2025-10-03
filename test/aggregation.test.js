import test from 'node:test';
import assert from 'node:assert/strict';
import {
  aggregateAudienceInsights,
  aggregateContentPerformance,
  aggregateMetrics,
  aggregateTrends,
  buildArtistOverview,
  buildArtistMetricsSnapshot,
  findArtistById,
  getServicesForArtist,
  listArtistsWithSummaries
} from '../src/services/aggregationService.js';

const getArtistServices = (artistId) => {
  const artist = findArtistById(artistId);
  assert.ok(artist, `Artist ${artistId} should exist for test setup`);
  const services = getServicesForArtist(artist);
  assert.ok(services.length > 0, `Expected artist ${artistId} to have services`);
  return services;
};

test('findArtistById returns an existing artist', () => {
  const artist = findArtistById('artist-001');
  assert.ok(artist, 'Expected artist to be found');
  assert.equal(artist.name, 'Lumen Echo');
});

test('getServicesForArtist returns configured services with nested data', () => {
  const services = getArtistServices('artist-001');
  const serviceIds = services.map((service) => service.id);
  assert.deepEqual(serviceIds.sort(), ['apple', 'spotify', 'tidal']);
  assert.ok(services.every((service) => service.metrics && service.topContent));
});

test('aggregateMetrics sums streams, followers, revenue, and engagement for an artist', () => {
  const metrics = aggregateMetrics(getArtistServices('artist-001'));
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
  const audience = aggregateAudienceInsights(getArtistServices('artist-001'));
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
  const content = aggregateContentPerformance(getArtistServices('artist-001'));
  assert.ok(content.tracks.includes('Neon Dreams'));
  assert.ok(content.tracks.includes('Aurora'));
  assert.ok(content.playlists.includes('Indie Radar'));
});

test('aggregateTrends sums timeline points across services and sorts by date', () => {
  const trends = aggregateTrends(getArtistServices('artist-001'));
  assert.equal(trends.streams[0].date, '2023-08-01');
  assert.equal(
    trends.streams.find((point) => point.date === '2024-01-01').value,
    72000 + 47000 + 13000
  );
  assert.ok(trends.revenue.length > 0);
});

test('buildArtistOverview returns aggregated data with insights for artist', () => {
  const overview = buildArtistOverview('artist-001');
  assert.equal(overview.id, 'artist-001');
  assert.equal(overview.metrics.streams, 1250000 + 840000 + 265000);
  assert.equal(overview.trends.streams.length > 0, true);
  assert.ok(overview.insights.primaryPlatform);
});

test('listArtistsWithSummaries returns summaries for every artist', () => {
  const summaries = listArtistsWithSummaries();
  assert.equal(summaries.length, 3);
  const ids = summaries.map((summary) => summary.id).sort();
  assert.deepEqual(ids, ['artist-001', 'artist-002', 'artist-003']);
});

test('buildArtistMetricsSnapshot returns totals, averages, and change for complete timeline', () => {
  const artistId = 'artist-001';
  const services = getArtistServices(artistId);
  const aggregated = aggregateTrends(services);
  const snapshot = buildArtistMetricsSnapshot(artistId);

  assert.equal(snapshot.artist.id, artistId);
  assert.deepEqual(snapshot.trends, aggregated);

  const expectedTotals = aggregated.streams.reduce((sum, point) => sum + point.value, 0);
  assert.equal(snapshot.metrics.streams.total, expectedTotals);
  assert.equal(
    snapshot.metrics.streams.change,
    aggregated.streams[aggregated.streams.length - 1].value - aggregated.streams[0].value
  );
  assert.equal(snapshot.metrics.streams.points, aggregated.streams.length);
  assert.equal(snapshot.period.actualStart, aggregated.streams[0].date);
  assert.equal(
    snapshot.period.actualEnd,
    aggregated.streams[aggregated.streams.length - 1].date
  );
});

test('buildArtistMetricsSnapshot filters series by provided range', () => {
  const artistId = 'artist-002';
  const startDate = new Date('2023-10-01');
  const endDate = new Date('2023-12-01');
  const snapshot = buildArtistMetricsSnapshot(artistId, { startDate, endDate });

  assert.equal(snapshot.period.requestedStart, '2023-10-01');
  assert.equal(snapshot.period.requestedEnd, '2023-12-01');
  assert.equal(snapshot.period.actualStart, '2023-10-01');
  assert.equal(snapshot.period.actualEnd, '2023-12-01');

  const series = snapshot.trends.streams;
  assert.ok(series.every((point) => point.date >= '2023-10-01' && point.date <= '2023-12-01'));
  assert.equal(series.length > 0, true);
  const total = series.reduce((sum, point) => sum + point.value, 0);
  assert.equal(snapshot.metrics.streams.total, total);
});

test('buildArtistMetricsSnapshot returns zeroed metrics when range has no data', () => {
  const snapshot = buildArtistMetricsSnapshot('artist-003', {
    startDate: new Date('2030-01-01'),
    endDate: new Date('2030-12-31')
  });

  assert.equal(snapshot.trends.streams.length, 0);
  assert.deepEqual(snapshot.metrics.streams, { total: 0, average: 0, change: null, points: 0 });
  assert.equal(snapshot.period.actualStart, null);
  assert.equal(snapshot.period.actualEnd, null);
});
