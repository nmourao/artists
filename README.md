# Artist Data Aggregator API

This project provides a Node.js/Express API that demonstrates how an artist-facing dashboard could aggregate data from several music streaming services. The API exposes endpoints for:

- Listing artists and their high-level metrics.
- Fetching a detailed overview that includes aggregated performance metrics, audience insights, and content performance.
- Retrieving the streaming services connected to an artist profile.
- Updating artist profile information across connected services (mock implementation).

The backend currently uses mocked service responses so it can be explored without connecting to real provider APIs. The structure is designed to make it easy to replace the mocks with production integrations.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or newer
- [npm](https://www.npmjs.com/)

### Installation

```bash
npm install
```

### Running the development server

```bash
npm run dev
```

This starts the API on `http://localhost:3000` with auto-reload enabled via `nodemon`.

### Production build

```bash
npm start
```

### Tests

The project uses the built-in Node.js test runner. To execute the test suite:

```bash
npm test
```

## API Overview

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| `GET` | `/` | API health check and endpoint summary. |
| `GET` | `/artists` | List artists with aggregate metrics. |
| `GET` | `/artists/:artistId` | Fetch a detailed overview for an artist. |
| `GET` | `/artists/:artistId/services` | List the connected streaming services. |
| `PUT` | `/artists/:artistId/profile` | Update an artist profile (mock persistence). |

Example request to fetch the detailed view:

```bash
curl http://localhost:3000/artists/artist-001 | jq
```

## Project Structure

```
.
├── src
│   ├── data            # Mock artist and service data
│   ├── routes          # Express route definitions
│   ├── services        # Aggregation logic and profile update helpers
│   └── index.js        # Express application entry point
├── test                # Node.js test runner suites
├── package.json        # Project metadata and scripts
└── README.md           # Project documentation
```

## Next Steps

An outline of the recommended roadmap is maintained in [`docs/NEXT_STEPS.md`](docs/NEXT_STEPS.md). It expands on the following themes:

- Replacing mocked service data with real provider integrations.
- Persisting artist profiles and metrics in a relational database such as PostgreSQL.
- Building a React or Angular front-end that consumes this API and offers configurable dashboards.
- Adding authentication (OAuth) and role-based access controls for artist teams.
- Expanding automated test coverage with integration tests against the real providers once available.

