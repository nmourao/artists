export const widgetCatalog = [
  {
    id: 'overview',
    name: 'Resumo Geral',
    description: 'Exibe streams, seguidores, receita e engajamento consolidados.',
    type: 'summary'
  },
  {
    id: 'streams-over-time',
    name: 'Streams ao Longo do Tempo',
    description: 'Comparativo mensal de streams agregados entre os serviços.',
    type: 'timeseries',
    metric: 'streams'
  },
  {
    id: 'revenue-over-time',
    name: 'Receita ao Longo do Tempo',
    description: 'Curva de receita combinada para monitorar crescimento financeiro.',
    type: 'timeseries',
    metric: 'revenue'
  },
  {
    id: 'audience-demographics',
    name: 'Demografia do Público',
    description: 'Faixas etárias e interesses predominantes por audiência.',
    type: 'audience'
  },
  {
    id: 'top-locations',
    name: 'Principais Territórios',
    description: 'Locais com maior audiência considerando todos os serviços.',
    type: 'list'
  },
  {
    id: 'top-content',
    name: 'Conteúdo em Destaque',
    description: 'Faixas, álbuns e playlists com melhor desempenho recente.',
    type: 'list'
  }
];

export const defaultLayout = ['overview', 'streams-over-time', 'audience-demographics', 'top-content'];

export const initialDashboardLayouts = {
  'artist-001': ['overview', 'streams-over-time', 'revenue-over-time', 'top-content', 'top-locations'],
  'artist-002': ['overview', 'streams-over-time', 'audience-demographics', 'top-content'],
  'artist-003': ['overview', 'streams-over-time', 'revenue-over-time', 'audience-demographics', 'top-locations']
};
