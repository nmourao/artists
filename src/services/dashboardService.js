import { artists } from '../data/artists.js';
import { defaultLayout, initialDashboardLayouts, widgetCatalog } from '../data/dashboards.js';

const MAX_WIDGETS = 8;
const widgetIds = new Set(widgetCatalog.map((widget) => widget.id));
const layoutStore = new Map(
  Object.entries(initialDashboardLayouts).map(([artistId, layout]) => [artistId, [...layout]])
);

const cloneLayout = (layout) => [...layout];

const sanitizeLayout = (layout) => {
  const seen = new Set();
  const sanitized = [];

  layout.forEach((widgetId) => {
    if (!widgetIds.has(widgetId)) return;
    if (seen.has(widgetId)) return;
    seen.add(widgetId);
    sanitized.push(widgetId);
  });

  if (sanitized.length === 0) {
    return cloneLayout(defaultLayout);
  }

  return sanitized;
};

const artistExists = (artistId) => artists.some((artist) => artist.id === artistId);

const buildDashboardResponse = (layout) => ({
  layout,
  widgets: widgetCatalog
});

export const resetDashboardLayouts = () => {
  layoutStore.clear();
  Object.entries(initialDashboardLayouts).forEach(([artistId, layout]) => {
    layoutStore.set(artistId, [...layout]);
  });
};

export const getDashboard = (artistId) => {
  if (!artistExists(artistId)) {
    return { dashboard: null, error: `Artist with id "${artistId}" was not found.` };
  }

  const storedLayout = layoutStore.get(artistId) ?? cloneLayout(defaultLayout);
  const layout = sanitizeLayout(storedLayout);
  layoutStore.set(artistId, layout);

  return { dashboard: buildDashboardResponse(layout), error: null };
};

export const updateDashboard = (artistId, payload) => {
  if (!artistExists(artistId)) {
    return { dashboard: null, error: `Artist with id "${artistId}" was not found.` };
  }

  if (payload === null || typeof payload !== 'object' || Array.isArray(payload)) {
    return { dashboard: null, error: ['Provide the dashboard payload as an object.'] };
  }

  const { layout } = payload;
  if (!Array.isArray(layout)) {
    return { dashboard: null, error: ['Provide the "layout" array with widget identifiers.'] };
  }

  if (layout.length === 0) {
    return { dashboard: null, error: ['Select at least one widget to compose the dashboard.'] };
  }

  if (layout.length > MAX_WIDGETS) {
    return {
      dashboard: null,
      error: [`Dashboards suportam no máximo ${MAX_WIDGETS} widgets.`]
    };
  }

  const errors = [];
  const seen = new Set();
  layout.forEach((widgetId) => {
    if (typeof widgetId !== 'string') {
      errors.push('Widget identifiers devem ser strings.');
      return;
    }

    if (!widgetIds.has(widgetId)) {
      errors.push(`Widget "${widgetId}" não é suportado.`);
      return;
    }

    if (seen.has(widgetId)) {
      errors.push(`Widget "${widgetId}" foi informado mais de uma vez.`);
      return;
    }

    seen.add(widgetId);
  });

  if (errors.length > 0) {
    return { dashboard: null, error: errors };
  }

  const sanitizedLayout = sanitizeLayout(layout);
  layoutStore.set(artistId, sanitizedLayout);

  return { dashboard: buildDashboardResponse(sanitizedLayout), error: null };
};
