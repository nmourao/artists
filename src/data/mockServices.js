export const streamingServices = [
  {
    id: 'spotify',
    name: 'Spotify for Artists',
    artists: {
      'artist-001': {
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
        },
        trends: {
          streams: [
            { date: '2023-08-01', value: 42000 },
            { date: '2023-09-01', value: 47000 },
            { date: '2023-10-01', value: 52000 },
            { date: '2023-11-01', value: 61000 },
            { date: '2023-12-01', value: 67000 },
            { date: '2024-01-01', value: 72000 }
          ],
          followers: [
            { date: '2023-08-01', value: 38000 },
            { date: '2023-10-01', value: 42000 },
            { date: '2023-12-01', value: 45500 },
            { date: '2024-01-01', value: 48200 }
          ],
          revenue: [
            { date: '2023-08-01', value: 4200 },
            { date: '2023-10-01', value: 5200 },
            { date: '2023-12-01', value: 6200 },
            { date: '2024-01-01', value: 6900 }
          ]
        }
      },
      'artist-002': {
        metrics: {
          streams: 980000,
          followers: 36500,
          revenue: 27600,
          engagement: {
            likes: 11800,
            comments: 610,
            shares: 960
          }
        },
        audience: {
          ageGroups: {
            '13-17': 0.07,
            '18-24': 0.34,
            '25-34': 0.36,
            '35-44': 0.17,
            '45+': 0.06
          },
          topLocations: ['United States', 'Mexico', 'Spain'],
          interests: ['Festival EDM', 'Synthwave']
        },
        topContent: {
          tracks: ['Solar Flare', 'Midnight Pulse'],
          playlists: ['Dance Rising', 'Festival Anthems'],
          albums: ['Horizons Awake']
        },
        trends: {
          streams: [
            { date: '2023-08-01', value: 35000 },
            { date: '2023-09-01', value: 39000 },
            { date: '2023-10-01', value: 43000 },
            { date: '2023-11-01', value: 47000 },
            { date: '2023-12-01', value: 52000 },
            { date: '2024-01-01', value: 56000 }
          ],
          followers: [
            { date: '2023-08-01', value: 28500 },
            { date: '2023-10-01', value: 32000 },
            { date: '2023-12-01', value: 34800 },
            { date: '2024-01-01', value: 36500 }
          ],
          revenue: [
            { date: '2023-08-01', value: 3300 },
            { date: '2023-10-01', value: 4200 },
            { date: '2023-12-01', value: 4800 },
            { date: '2024-01-01', value: 5200 }
          ]
        }
      }
    }
  },
  {
    id: 'apple',
    name: 'Apple for Artists',
    artists: {
      'artist-001': {
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
        },
        trends: {
          streams: [
            { date: '2023-08-01', value: 30000 },
            { date: '2023-09-01', value: 33000 },
            { date: '2023-10-01', value: 36000 },
            { date: '2023-11-01', value: 41000 },
            { date: '2023-12-01', value: 44000 },
            { date: '2024-01-01', value: 47000 }
          ],
          followers: [
            { date: '2023-08-01', value: 19000 },
            { date: '2023-10-01', value: 20500 },
            { date: '2023-12-01', value: 21800 },
            { date: '2024-01-01', value: 22500 }
          ],
          revenue: [
            { date: '2023-08-01', value: 3600 },
            { date: '2023-10-01', value: 4200 },
            { date: '2023-12-01', value: 4700 },
            { date: '2024-01-01', value: 5100 }
          ]
        }
      },
      'artist-003': {
        metrics: {
          streams: 720000,
          followers: 19800,
          revenue: 24100,
          engagement: {
            likes: 8400,
            comments: 520,
            shares: 740
          }
        },
        audience: {
          ageGroups: {
            '13-17': 0.06,
            '18-24': 0.29,
            '25-34': 0.38,
            '35-44': 0.19,
            '45+': 0.08
          },
          topLocations: ['Canada', 'United Kingdom', 'Netherlands'],
          interests: ['Dream Pop', 'Shoegaze']
        },
        topContent: {
          tracks: ['Velvet Skies', 'Chromatic Wave'],
          playlists: ['Dream Pop Essentials'],
          albums: ['Lunar Bloom']
        },
        trends: {
          streams: [
            { date: '2023-08-01', value: 26000 },
            { date: '2023-09-01', value: 28000 },
            { date: '2023-10-01', value: 32000 },
            { date: '2023-11-01', value: 35000 },
            { date: '2023-12-01', value: 38000 },
            { date: '2024-01-01', value: 42000 }
          ],
          followers: [
            { date: '2023-08-01', value: 15200 },
            { date: '2023-10-01', value: 17000 },
            { date: '2023-12-01', value: 18600 },
            { date: '2024-01-01', value: 19800 }
          ],
          revenue: [
            { date: '2023-08-01', value: 2800 },
            { date: '2023-10-01', value: 3200 },
            { date: '2023-12-01', value: 3600 },
            { date: '2024-01-01', value: 3900 }
          ]
        }
      }
    }
  },
  {
    id: 'tidal',
    name: 'Tidal for Artists',
    artists: {
      'artist-001': {
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
        },
        trends: {
          streams: [
            { date: '2023-08-01', value: 9000 },
            { date: '2023-09-01', value: 9500 },
            { date: '2023-10-01', value: 10200 },
            { date: '2023-11-01', value: 11000 },
            { date: '2023-12-01', value: 12000 },
            { date: '2024-01-01', value: 13000 }
          ],
          followers: [
            { date: '2023-08-01', value: 6400 },
            { date: '2023-10-01', value: 7000 },
            { date: '2023-12-01', value: 7500 },
            { date: '2024-01-01', value: 7800 }
          ],
          revenue: [
            { date: '2023-08-01', value: 2200 },
            { date: '2023-10-01', value: 2600 },
            { date: '2023-12-01', value: 3000 },
            { date: '2024-01-01', value: 3300 }
          ]
        }
      },
      'artist-003': {
        metrics: {
          streams: 198000,
          followers: 6300,
          revenue: 11200,
          engagement: {
            likes: 2100,
            comments: 160,
            shares: 190
          }
        },
        audience: {
          ageGroups: {
            '18-24': 0.18,
            '25-34': 0.36,
            '35-44': 0.28,
            '45+': 0.18
          },
          topLocations: ['United States', 'Sweden'],
          interests: ['Vinyl Collectors', 'Indie Pop']
        },
        topContent: {
          tracks: ['Chromatic Wave'],
          playlists: ['Indie Discovery'],
          albums: ['Lunar Bloom']
        },
        trends: {
          streams: [
            { date: '2023-08-01', value: 6200 },
            { date: '2023-09-01', value: 6600 },
            { date: '2023-10-01', value: 7200 },
            { date: '2023-11-01', value: 7800 },
            { date: '2023-12-01', value: 8200 },
            { date: '2024-01-01', value: 8600 }
          ],
          followers: [
            { date: '2023-08-01', value: 5200 },
            { date: '2023-10-01', value: 5800 },
            { date: '2023-12-01', value: 6100 },
            { date: '2024-01-01', value: 6300 }
          ],
          revenue: [
            { date: '2023-08-01', value: 1800 },
            { date: '2023-10-01', value: 2100 },
            { date: '2023-12-01', value: 2400 },
            { date: '2024-01-01', value: 2600 }
          ]
        }
      }
    }
  },
  {
    id: 'amazon',
    name: 'Amazon for Artists',
    artists: {
      'artist-002': {
        metrics: {
          streams: 540000,
          followers: 18200,
          revenue: 19800,
          engagement: {
            likes: 6400,
            comments: 320,
            shares: 510
          }
        },
        audience: {
          ageGroups: {
            '13-17': 0.05,
            '18-24': 0.31,
            '25-34': 0.4,
            '35-44': 0.17,
            '45+': 0.07
          },
          topLocations: ['United States', 'Japan'],
          interests: ['Bass Music', 'Gaming']
        },
        topContent: {
          tracks: ['Pulse Driver', 'Aurora Run'],
          playlists: ['EDM Now'],
          albums: ['Horizons Awake']
        },
        trends: {
          streams: [
            { date: '2023-08-01', value: 18000 },
            { date: '2023-09-01', value: 21000 },
            { date: '2023-10-01', value: 24000 },
            { date: '2023-11-01', value: 26000 },
            { date: '2023-12-01', value: 28000 },
            { date: '2024-01-01', value: 30000 }
          ],
          followers: [
            { date: '2023-08-01', value: 14000 },
            { date: '2023-10-01', value: 16000 },
            { date: '2023-12-01', value: 17400 },
            { date: '2024-01-01', value: 18200 }
          ],
          revenue: [
            { date: '2023-08-01', value: 2400 },
            { date: '2023-10-01', value: 2900 },
            { date: '2023-12-01', value: 3300 },
            { date: '2024-01-01', value: 3600 }
          ]
        }
      }
    }
  },
  {
    id: 'deezer',
    name: 'Deezer for Creators',
    artists: {
      'artist-002': {
        metrics: {
          streams: 305000,
          followers: 12900,
          revenue: 9400,
          engagement: {
            likes: 4100,
            comments: 210,
            shares: 340
          }
        },
        audience: {
          ageGroups: {
            '13-17': 0.08,
            '18-24': 0.33,
            '25-34': 0.35,
            '35-44': 0.17,
            '45+': 0.07
          },
          topLocations: ['France', 'Brazil'],
          interests: ['Electro Pop', 'Workout Playlists']
        },
        topContent: {
          tracks: ['Solar Flare'],
          playlists: ['Cardio Boost'],
          albums: ['Horizons Awake']
        },
        trends: {
          streams: [
            { date: '2023-08-01', value: 11000 },
            { date: '2023-09-01', value: 12500 },
            { date: '2023-10-01', value: 14000 },
            { date: '2023-11-01', value: 15500 },
            { date: '2023-12-01', value: 17000 },
            { date: '2024-01-01', value: 18000 }
          ],
          followers: [
            { date: '2023-08-01', value: 9800 },
            { date: '2023-10-01', value: 11400 },
            { date: '2023-12-01', value: 12300 },
            { date: '2024-01-01', value: 12900 }
          ],
          revenue: [
            { date: '2023-08-01', value: 1500 },
            { date: '2023-10-01', value: 2100 },
            { date: '2023-12-01', value: 2500 },
            { date: '2024-01-01', value: 2800 }
          ]
        }
      },
      'artist-003': {
        metrics: {
          streams: 256000,
          followers: 11100,
          revenue: 8200,
          engagement: {
            likes: 3600,
            comments: 240,
            shares: 310
          }
        },
        audience: {
          ageGroups: {
            '13-17': 0.09,
            '18-24': 0.31,
            '25-34': 0.33,
            '35-44': 0.17,
            '45+': 0.1
          },
          topLocations: ['Brazil', 'Portugal'],
          interests: ['Chillwave', 'Late Night Drives']
        },
        topContent: {
          tracks: ['Velvet Skies'],
          playlists: ['Focus Flow'],
          albums: ['Lunar Bloom']
        },
        trends: {
          streams: [
            { date: '2023-08-01', value: 9000 },
            { date: '2023-09-01', value: 10200 },
            { date: '2023-10-01', value: 11800 },
            { date: '2023-11-01', value: 13000 },
            { date: '2023-12-01', value: 14200 },
            { date: '2024-01-01', value: 15000 }
          ],
          followers: [
            { date: '2023-08-01', value: 8600 },
            { date: '2023-10-01', value: 9600 },
            { date: '2023-12-01', value: 10400 },
            { date: '2024-01-01', value: 11100 }
          ],
          revenue: [
            { date: '2023-08-01', value: 1300 },
            { date: '2023-10-01', value: 1700 },
            { date: '2023-12-01', value: 2100 },
            { date: '2024-01-01', value: 2300 }
          ]
        }
      }
    }
  }
];
