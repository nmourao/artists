import { artists } from '../data/artists.js';
import { streamingServices } from '../data/mockServices.js';

const defaultEngagement = { likes: 0, comments: 0, shares: 0 };

const mergeEngagement = (acc, engagement) => ({
  likes: acc.likes + (engagement?.likes ?? 0),
  comments: acc.comments + (engagement?.comments ?? 0),
  shares: acc.shares + (engagement?.shares ?? 0)
});

export const findArtistById = (artistId) => artists.find((artist) => artist.id === artistId);

export const getServicesForArtist = (artist) => {
  if (!artist) return [];
  return streamingServices.filter((service) => artist.services.includes(service.id));
};

export const aggregateMetrics = (services) => {
  return services.reduce(
    (acc, service) => {
      const metrics = service.metrics ?? {};
      return {
        streams: acc.streams + (metrics.streams ?? 0),
        followers: acc.followers + (metrics.followers ?? 0),
        revenue: acc.revenue + (metrics.revenue ?? 0),
        engagement: mergeEngagement(acc.engagement, metrics.engagement ?? defaultEngagement)
      };
    },
    { streams: 0, followers: 0, revenue: 0, engagement: { ...defaultEngagement } }
  );
};

export const aggregateAudienceInsights = (services) => {
  const ageGroupTotals = {};
  const ageGroupCounts = {};
  const locations = new Set();
  const interests = new Set();

  services.forEach((service) => {
    const audience = service.audience ?? {};
    const ageGroups = audience.ageGroups ?? {};

    Object.entries(ageGroups).forEach(([range, percentage]) => {
      if (typeof percentage !== 'number') return;
      ageGroupTotals[range] = (ageGroupTotals[range] ?? 0) + percentage;
      ageGroupCounts[range] = (ageGroupCounts[range] ?? 0) + 1;
    });

    (audience.topLocations ?? []).forEach((location) => locations.add(location));
    (audience.interests ?? []).forEach((interest) => interests.add(interest));
  });

  const ageGroupAverages = Object.entries(ageGroupTotals).reduce((acc, [range, total]) => {
    const count = ageGroupCounts[range] ?? 1;
    acc[range] = parseFloat((total / count).toFixed(2));
    return acc;
  }, {});

  return {
    ageGroups: ageGroupAverages,
    topLocations: Array.from(locations),
    interests: Array.from(interests)
  };
};

export const aggregateContentPerformance = (services) => {
  const tracks = new Set();
  const albums = new Set();
  const playlists = new Set();

  services.forEach((service) => {
    const topContent = service.topContent ?? {};
    (topContent.tracks ?? []).forEach((track) => tracks.add(track));
    (topContent.albums ?? []).forEach((album) => albums.add(album));
    (topContent.playlists ?? []).forEach((playlist) => playlists.add(playlist));
  });

  return {
    tracks: Array.from(tracks),
    albums: Array.from(albums),
    playlists: Array.from(playlists)
  };
};

export const buildArtistOverview = (artistId) => {
  const artist = findArtistById(artistId);
  if (!artist) return null;

  const services = getServicesForArtist(artist);
  const metrics = aggregateMetrics(services);
  const audience = aggregateAudienceInsights(services);
  const content = aggregateContentPerformance(services);

  return {
    ...artist,
    metrics,
    audience,
    content,
    services: services.map((service) => ({
      id: service.id,
      name: service.name,
      metrics: service.metrics
    }))
  };
};

export const listArtistsWithSummaries = () =>
  artists.map((artist) => {
    const services = getServicesForArtist(artist);
    const metrics = aggregateMetrics(services);
    return {
      id: artist.id,
      name: artist.name,
      profileImage: artist.profileImage,
      metrics: {
        streams: metrics.streams,
        followers: metrics.followers,
        revenue: metrics.revenue
      }
    };
  });
