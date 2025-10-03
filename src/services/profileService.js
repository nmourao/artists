import { artists } from '../data/artists.js';

const allowedFields = new Set(['name', 'bio', 'profileImage', 'headerImage', 'socials']);
const socialFields = ['instagram', 'twitter', 'youtube', 'facebook', 'tiktok', 'website'];

const isString = (value) => typeof value === 'string';

const isValidUrl = (value) => {
  try {
    new URL(value);
    return true;
  } catch (error) {
    return false;
  }
};

const validateProfileUpdates = (updates) => {
  if (updates === null || typeof updates !== 'object' || Array.isArray(updates)) {
    return ['Profile updates must be provided as an object.'];
  }

  const keys = Object.keys(updates);
  if (keys.length === 0) {
    return ['Provide at least one field to update.'];
  }

  const errors = [];

  keys.forEach((key) => {
    if (!allowedFields.has(key)) {
      errors.push(`"${key}" is not a supported profile field.`);
    }
  });

  if (updates.name !== undefined) {
    if (!isString(updates.name)) {
      errors.push('Name must be a string.');
    } else if (updates.name.trim().length < 2 || updates.name.trim().length > 120) {
      errors.push('Name must be between 2 and 120 characters.');
    }
  }

  if (updates.bio !== undefined) {
    if (!isString(updates.bio)) {
      errors.push('Bio must be a string.');
    } else if (updates.bio.length > 1000) {
      errors.push('Bio must be 1000 characters or fewer.');
    }
  }

  const validateImageField = (fieldName) => {
    const value = updates[fieldName];
    if (value === undefined) return;
    if (!isString(value)) {
      errors.push(`${fieldName} must be a string URL.`);
      return;
    }
    if (!isValidUrl(value)) {
      errors.push(`${fieldName} must be a valid URL.`);
    }
  };

  validateImageField('profileImage');
  validateImageField('headerImage');

  if (updates.socials !== undefined) {
    const socials = updates.socials;
    if (socials === null || typeof socials !== 'object' || Array.isArray(socials)) {
      errors.push('Social links must be provided as an object.');
    } else {
      const socialKeys = Object.keys(socials);
      if (socialKeys.length === 0) {
        errors.push('Provide at least one social link to update.');
      }

      socialKeys.forEach((socialKey) => {
        if (!socialFields.includes(socialKey)) {
          errors.push(`"${socialKey}" is not a supported social profile.`);
          return;
        }

        const value = socials[socialKey];
        if (!isString(value)) {
          errors.push(`${socialKey} link must be a string.`);
        } else if (!isValidUrl(value)) {
          errors.push(`${socialKey} link must be a valid URL.`);
        }
      });
    }
  }

  return errors;
};

export const updateArtistProfile = (artistId, updates) => {
  const artistIndex = artists.findIndex((artist) => artist.id === artistId);
  if (artistIndex === -1) {
    return { artist: null, error: `Artist with id "${artistId}" was not found.` };
  }

  const validationErrors = validateProfileUpdates(updates);
  if (validationErrors.length > 0) {
    return {
      artist: null,
      error: validationErrors
    };
  }

  const artist = artists[artistIndex];
  const mergedSocials =
    updates.socials !== undefined
      ? { ...artist.socials, ...updates.socials }
      : artist.socials;

  const merged = {
    ...artist,
    ...updates,
    socials: mergedSocials
  };

  artists[artistIndex] = merged;

  return { artist: merged, error: null };
};
