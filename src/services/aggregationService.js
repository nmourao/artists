import { artists } from '../data/artists.js';
import { streamingServices } from '../data/mockServices.js';

const defaultEngagement = { likes: 0, comments: 0, shares: 0 };
const trendMetrics = ['streams', 'followers', 'revenue'];
const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;

const mergeEngagement = (acc, engagement) => ({
  likes: acc.likes + (engagement?.likes ?? 0),
  comments: acc.comments + (engagement?.comments ?? 0),
  shares: acc.shares + (engagement?.shares ?? 0)
});

export const findArtistById = (artistId) => artists.find((artist) => artist.id === artistId);

export const getServicesForArtist = (artist) => {
  if (!artist) return [];

  return streamingServices
    .map((service) => {
      if (!artist.services.includes(service.id)) return null;
      const artistData = service.artists?.[artist.id];
      if (!artistData) return null;

      return {
        id: service.id,
        name: service.name,
        ...artistData
      };
    })
    .filter(Boolean);
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

const sortByDateAsc = (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime();

const parseAsDate = (value) => {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const filterSeriesByRange = (series, startDate, endDate) => {
  const start = parseAsDate(startDate);
  const end = parseAsDate(endDate);

  return series.filter((point) => {
    const pointDate = parseAsDate(point.date);
    if (!pointDate) return false;
    if (start && pointDate < start) return false;
    if (end && pointDate > end) return false;
    return true;
  });
};

const formatDate = (date) => {
  if (!date) return null;
  if (typeof date === 'string' && isoDateRegex.test(date)) return date;
  const parsed = parseAsDate(date);
  if (!parsed) return null;
  return parsed.toISOString().slice(0, 10);
};

const summariseSeries = (series) => {
  if (series.length === 0) {
    return { total: 0, average: 0, change: null, points: 0 };
  }

  const total = series.reduce((sum, point) => sum + point.value, 0);
  const average = parseFloat((total / series.length).toFixed(2));
  const change =
    series.length < 2
      ? null
      : parseFloat((series[series.length - 1].value - series[0].value).toFixed(2));

  return {
    total,
    average,
    change,
    points: series.length
  };
};

export const aggregateTrends = (services) => {
  const totals = trendMetrics.reduce((acc, metric) => {
    acc[metric] = new Map();
    return acc;
  }, {});

  services.forEach((service) => {
    trendMetrics.forEach((metric) => {
      const series = service.trends?.[metric] ?? [];
      series.forEach((point) => {
        if (!point?.date || typeof point.value !== 'number') return;
        const map = totals[metric];
        map.set(point.date, (map.get(point.date) ?? 0) + point.value);
      });
    });
  });

  return trendMetrics.reduce(
    (acc, metric) => {
      const series = Array.from(totals[metric].entries())
        .map(([date, value]) => ({ date, value }))
        .sort(sortByDateAsc);
      acc[metric] = series;
      return acc;
    },
    { streams: [], followers: [], revenue: [] }
  );
};

const deriveHeadlineInsights = (services, trends) => {
  if (services.length === 0) {
    return {
      primaryPlatform: null,
      mostRecentRevenue: null,
      streamGrowthPercentage: null,
      topTrack: null
    };
  }

  const primaryPlatform = services.reduce((top, current) => {
    const topStreams = top?.metrics?.streams ?? -Infinity;
    const currentStreams = current.metrics?.streams ?? 0;
    return currentStreams > topStreams ? current : top;
  }, null);

  const streamSeries = trends.streams ?? [];
  const growthPercentage = (() => {
    if (streamSeries.length < 2) return null;
    const first = streamSeries[0].value;
    const last = streamSeries[streamSeries.length - 1].value;
    if (!first) return null;
    return parseFloat((((last - first) / first) * 100).toFixed(2));
  })();

  const mostRecentRevenue = (() => {
    const revenueSeries = trends.revenue ?? [];
    if (revenueSeries.length === 0) return null;
    return revenueSeries[revenueSeries.length - 1].value;
  })();

  const topTrack = services
    .flatMap((service) => service.topContent?.tracks ?? [])
    .reduce(
      (top, track) => {
        if (!top.seen.has(track)) {
          top.seen.add(track);
          top.order.push(track);
        }
        return top;
      },
      { seen: new Set(), order: [] }
    ).order[0] ?? null;

  return {
    primaryPlatform: primaryPlatform ? { id: primaryPlatform.id, name: primaryPlatform.name } : null,
    mostRecentRevenue,
    streamGrowthPercentage: growthPercentage,
    topTrack
  };
};

export const buildArtistOverview = (artistId) => {
  const artist = findArtistById(artistId);
  if (!artist) return null;

  const services = getServicesForArtist(artist);
  const metrics = aggregateMetrics(services);
  const audience = aggregateAudienceInsights(services);
  const content = aggregateContentPerformance(services);
  const trends = aggregateTrends(services);
  const insights = deriveHeadlineInsights(services, trends);

  return {
    ...artist,
    metrics,
    audience,
    content,
    trends,
    insights,
    services: services.map((service) => ({
      id: service.id,
      name: service.name,
      metrics: service.metrics,
      audience: service.audience,
      topContent: service.topContent,
      trends: service.trends
    }))
  };
};

export const listArtistsWithSummaries = () =>
  artists.map((artist) => {
    const services = getServicesForArtist(artist);
    const metrics = aggregateMetrics(services);
    const insights = deriveHeadlineInsights(services, aggregateTrends(services));

    return {
      id: artist.id,
      name: artist.name,
      profileImage: artist.profileImage,
      metrics: {
        streams: metrics.streams,
        followers: metrics.followers,
        revenue: metrics.revenue
      },
      insights
    };
  });

export const buildArtistMetricsSnapshot = (artistId, { startDate, endDate } = {}) => {
  const artist = findArtistById(artistId);
  if (!artist) return null;

  const services = getServicesForArtist(artist);
  const aggregatedTrends = aggregateTrends(services);

  const filteredTrends = trendMetrics.reduce((acc, metric) => {
    const series = aggregatedTrends[metric] ?? [];
    acc[metric] = filterSeriesByRange(series, startDate, endDate);
    return acc;
  }, {});

  const metrics = trendMetrics.reduce((acc, metric) => {
    acc[metric] = summariseSeries(filteredTrends[metric]);
    return acc;
  }, {});

  let minDate = null;
  let maxDate = null;

  trendMetrics.forEach((metric) => {
    filteredTrends[metric].forEach((point) => {
      const pointDate = parseAsDate(point.date);
      if (!pointDate) return;
      if (!minDate || pointDate < minDate) minDate = pointDate;
      if (!maxDate || pointDate > maxDate) maxDate = pointDate;
    });
  });

  return {
    artist: {
      id: artist.id,
      name: artist.name
    },
    period: {
      requestedStart: formatDate(startDate ?? null),
      requestedEnd: formatDate(endDate ?? null),
      actualStart: formatDate(minDate),
      actualEnd: formatDate(maxDate)
    },
    metrics,
    trends: filteredTrends
  };
};
