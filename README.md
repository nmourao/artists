# Artist Data Aggregator API

This project provides a Node.js/Express API that demonstrates how an artist-facing dashboard could aggregate data from several music streaming services. The mock dataset inclui três artistas conectados a Spotify for Artists, Apple for Artists, Amazon for Artists, Tidal for Artists e Deezer for Creators, permitindo validar o fluxo de ponta a ponta. A API expõe endpoints para:

- Listar artistas com métricas consolidadas e destaques de insights.
- Obter um overview detalhado com métricas agregadas, insights de audiência, performance de conteúdo e tendências temporais.
- Consultar os serviços conectados a um artista com métricas individuais por plataforma.
- Atualizar as informações de perfil dos artistas (implementação mock).
- Ler e personalizar os widgets exibidos no dashboard do artista.

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
| `GET` | `/artists/:artistId/services` | List the connected streaming services com métricas por plataforma. |
| `GET` | `/artists/:artistId/metrics` | Obter séries temporais agregadas e estatísticas resumidas opcionamente filtradas por intervalo de datas. |
| `GET` | `/artists/:artistId/dashboard` | Obter o layout do dashboard e o catálogo de widgets disponíveis. |
| `PUT` | `/artists/:artistId/dashboard` | Atualizar a ordem de widgets do dashboard (mock persistence). |
| `PUT` | `/artists/:artistId/profile` | Update an artist profile (mock persistence). |

Example request to fetch the detailed view:

```bash
curl http://localhost:3000/artists/artist-001 | jq
```

Customizando o dashboard de `artist-001`:

```bash
curl -X PUT http://localhost:3000/artists/artist-001/dashboard \
  -H 'Content-Type: application/json' \
  -d '{"layout": ["overview", "streams-over-time", "top-content"]}' | jq
```

Consultando métricas agregadas de `artist-002` apenas para o último trimestre disponível:

```bash
curl "http://localhost:3000/artists/artist-002/metrics?start=2023-10-01&end=2024-01-01" | jq
```

O endpoint aceita os parâmetros opcionais `start` e `end` (formato `YYYY-MM-DD`). Quando fornecidos, o período é aplicado a todas as séries e as estatísticas retornadas refletem apenas o intervalo solicitado.

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

