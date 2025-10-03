import test from 'node:test';
import assert from 'node:assert/strict';
import { artists } from '../src/data/artists.js';
import { updateArtistProfile } from '../src/services/profileService.js';

const originalArtists = structuredClone(artists);

const resetArtists = () => {
  artists.length = 0;
  artists.push(...structuredClone(originalArtists));
};

test('updateArtistProfile rejects empty payloads', () => {
  resetArtists();
  const result = updateArtistProfile('artist-001', {});
  assert.equal(result.artist, null);
  assert.ok(Array.isArray(result.error));
  assert.ok(result.error.some((message) => message.toLowerCase().includes('at least one field')));
});

test('updateArtistProfile validates social handles object is not empty', () => {
  resetArtists();
  const result = updateArtistProfile('artist-001', { socials: {} });
  assert.equal(result.artist, null);
  assert.ok(result.error.some((message) => message.toLowerCase().includes('social link')));
});

test('updateArtistProfile merges social links when valid', () => {
  resetArtists();
  const result = updateArtistProfile('artist-001', {
    socials: { instagram: 'https://instagram.com/new-handle' }
  });

  assert.equal(result.error, null);
  assert.equal(result.artist.socials.instagram, 'https://instagram.com/new-handle');
  assert.equal(result.artist.socials.youtube, originalArtists[0].socials.youtube);
});

test('updateArtistProfile leaves existing socials untouched when not provided', () => {
  resetArtists();
  const result = updateArtistProfile('artist-001', {
    bio: 'Updated bio only'
  });

  assert.equal(result.error, null);
  assert.equal(result.artist.bio, 'Updated bio only');
  assert.deepEqual(result.artist.socials, originalArtists[0].socials);
});
