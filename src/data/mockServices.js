export const streamingServices = [
  {
    id: 'spotify',
    name: 'Spotify for Artists',
    metrics: {
      streams: 1250000,
      followers: 48200,
      revenue: 34000,
      engagement: {
        likes: 15200,
        comments: 830,
        shares: 1200
      }
    },
    audience: {
      ageGroups: {
        '13-17': 0.05,
        '18-24': 0.32,
        '25-34': 0.37,
        '35-44': 0.18,
        '45+': 0.08
      },
      topLocations: ['United States', 'United Kingdom', 'Brazil'],
      interests: ['Indie Pop', 'Lo-fi', 'Synthwave']
    },
    topContent: {
      tracks: ['Neon Dreams', 'Echoes', 'City Lights'],
      playlists: ['Chill Vibes', 'Indie Radar'],
      albums: ['Nightfall']
    }
  },
  {
    id: 'apple',
    name: 'Apple for Artists',
    metrics: {
      streams: 840000,
      followers: 22500,
      revenue: 28500,
      engagement: {
        likes: 9600,
        comments: 410,
        shares: 680
      }
    },
    audience: {
      ageGroups: {
        '13-17': 0.04,
        '18-24': 0.27,
        '25-34': 0.41,
        '35-44': 0.19,
        '45+': 0.09
      },
      topLocations: ['United States', 'Germany', 'Australia'],
      interests: ['Alt Pop', 'Electronic']
    },
    topContent: {
      tracks: ['City Lights', 'Aurora'],
      playlists: ['Fresh Finds'],
      albums: ['Nightfall']
    }
  },
  {
    id: 'tidal',
    name: 'Tidal for Artists',
    metrics: {
      streams: 265000,
      followers: 7800,
      revenue: 13800,
      engagement: {
        likes: 2800,
        comments: 190,
        shares: 240
      }
    },
    audience: {
      ageGroups: {
        '18-24': 0.22,
        '25-34': 0.38,
        '35-44': 0.25,
        '45+': 0.15
      },
      topLocations: ['Canada', 'France'],
      interests: ['Hi-Fi Audio', 'Alternative R&B']
    },
    topContent: {
      tracks: ['Echoes'],
      playlists: ['Audiophile Essentials'],
      albums: ['Nightfall']
    }
  }
];
