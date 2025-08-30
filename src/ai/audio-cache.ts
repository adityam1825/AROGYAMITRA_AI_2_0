/**
 * @fileOverview A simple in-memory cache for audio data URIs.
 */

// In a production app, you might use a more robust caching solution
// like Redis or Memcached. For this prototype, a simple Map is sufficient.
const audioCache = new Map<string, string>();

/**
 * Retrieves a cached audio data URI.
 * @param key The cache key (e.g., "en:Hello world").
 * @returns The cached data URI or undefined if not found.
 */
export function getCachedAudio(key: string): string | undefined {
  return audioCache.get(key);
}

/**
 * Stores an audio data URI in the cache.
 * @param key The cache key.
 * @param audioDataUri The audio data URI to store.
 */
export function setCachedAudio(key: string, audioDataUri: string): void {
  audioCache.set(key, audioDataUri);
}
