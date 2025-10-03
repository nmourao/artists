import test from 'node:test';
import assert from 'node:assert/strict';
import { getDashboard, resetDashboardLayouts, updateDashboard } from '../src/services/dashboardService.js';

const setup = () => {
  resetDashboardLayouts();
};

test('getDashboard returns stored layout and widget catalog', () => {
  setup();
  const { dashboard, error } = getDashboard('artist-001');
  assert.equal(error, null);
  assert.ok(Array.isArray(dashboard.layout));
  assert.ok(dashboard.layout.includes('streams-over-time'));
  assert.ok(Array.isArray(dashboard.widgets));
});

test('getDashboard returns not found error for unknown artist', () => {
  setup();
  const { dashboard, error } = getDashboard('missing-artist');
  assert.equal(dashboard, null);
  assert.equal(typeof error, 'string');
  assert.ok(error.includes('missing-artist'));
});

test('updateDashboard validates layout payload', () => {
  setup();
  const { dashboard: invalidDashboard, error: invalidError } = updateDashboard('artist-001', {
    layout: ['overview', 'overview']
  });
  assert.equal(invalidDashboard, null);
  assert.ok(Array.isArray(invalidError));
  assert.ok(invalidError.some((message) => message.includes('mais de uma vez')));

  const { dashboard, error } = updateDashboard('artist-001', {
    layout: ['overview', 'streams-over-time']
  });
  assert.equal(error, null);
  assert.deepEqual(dashboard.layout, ['overview', 'streams-over-time']);
});

test('updateDashboard limits maximum widgets', () => {
  setup();
  const { error } = updateDashboard('artist-001', {
    layout: ['overview', 'streams-over-time', 'revenue-over-time', 'audience-demographics', 'top-content', 'top-locations', 'overview', 'streams-over-time', 'top-content']
  });
  assert.ok(Array.isArray(error));
  assert.ok(error[0].includes('máximo'));
});
