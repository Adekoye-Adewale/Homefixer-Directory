// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.

import { client } from "./client";

export const sanityFetch = <T>(
  query: string,
  params?: Record<string, unknown>
): Promise<T> => {
  return client.fetch(query, params);
};
