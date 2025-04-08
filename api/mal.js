const api_url = "https://api.jikan.moe/v4"

export async function searchAnime({ query, limit = 10 }) {

  try {
    const response = await fetch(
      `${api_url}/anime?q=${encodeURIComponent(query)}&limit=${limit}`
    );
    const result = await response.json();
    return result.data; // Jikan returns data inside a `data` key
  } catch (error) {
    console.error("Failed to fetch anime:", error);
    return [];
  }
}


export async function getTopAnime() {
  try {
    const response = await fetch(`${api_url}/top/anime`);
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching top anime:", error);
  }
}

export async function getAnimeByID({ id }) {
  try {
    const response = await fetch(`${api_url}/anime/${id}`);
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error(`Error fetching anime with ID ${id}:`, error);
  }
}

