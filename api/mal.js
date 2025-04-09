const api_url = "https://api.jikan.moe/v4";

// Basic in-memory ETag cache
const etagCache = new Map();

async function fetchWithETag(url, revalidate = 3600) {
  const headers = {};
  const cached = etagCache.get(url);

  if (cached?.etag) {
    headers["If-None-Match"] = cached.etag;
  }

  const response = await fetch(url, {
    headers,
    next: { revalidate },
  });

  if (response.status === 304) {
    return cached.data; // Use cached data
  }

  const etag = response.headers.get("ETag");
  const result = await response.json();

  if (etag) {
    etagCache.set(url, { etag, data: result.data });
  }

  return result.data;
}

// Main functions updated to use fetchWithETag

export async function searchAnime({ query, limit = 10 }) {
  const url = `${api_url}/anime?q=${encodeURIComponent(query)}&limit=${limit}`;
  try {
    return await fetchWithETag(url, 3600);
  } catch (error) {
    console.error("Failed to fetch anime:", error);
    return [];
  }
}

export async function getTopAnime() {
  const url = `${api_url}/top/anime`;
  try {
    return await fetchWithETag(url, 3600);
  } catch (error) {
    console.error("Error fetching top anime:", error);
    return [];
  }
}

export async function getAnimeByID({ id }) {
  const url = `${api_url}/anime/${id}`;
  try {
    return await fetchWithETag(url, 3600);
  } catch (error) {
    console.error(`Error fetching anime with ID ${id}:`, error);
    return null;
  }
}

export async function getAnimeEpisodes({ id }) {
  const url = `${api_url}/anime/${id}/episodes`;
  try {
    return await fetchWithETag(url, 600);
  } catch (error) {
    console.error(`Error fetching episodes of anime with ID ${id}:`, error);
    return [];
  }
}
