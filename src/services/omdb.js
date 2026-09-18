// Shared API helper used by both the search and detail pages.
// "params" contains the search options.
// "signal" lets a page cancel a request when it is no longer needed.
export async function requestOMDb(params, signal) {
  // Vite loads this value from .env.local.
  // Optional chaining prevents an error when the variable is missing.
  const apiKey = import.meta.env.VITE_OMDB_API_KEY?.trim();

  if (!apiKey) {
    throw new Error(
      "Missing OMDb API key. Add it to .env.local and restart the server.",
    );
  }

  // URLSearchParams safely handles spaces and special characters.
  // The spread operator includes the options passed by the page,
  // such as { s: "Batman" } or { i: "tt0372784", plot: "full" }.
  const query = new URLSearchParams({
    ...params,
    apikey: apiKey,
  });

  const response = await fetch(
    `https://www.omdbapi.com/?${query}`,
    { signal },
  );

  // Check whether the HTTP request itself succeeded.
  if (!response.ok) {
    throw new Error("Could not reach OMDb. Please try again.");
  }

  // Convert the JSON response into a JavaScript object.
  const data = await response.json();

  // OMDb can return an error inside a successful HTTP response.
  // Its Response property is a string, not a Boolean.
  if (data.Response === "False") {
    // An unmatched title is an empty search result.
    // Other problems, such as an invalid key, should show an error.
    if (params.s && data.Error === "Movie not found!") {
      return {
        Search: [],
        totalResults: "0",
      };
    }

    throw new Error(
      data.Error || "Could not load movie information.",
    );
  }

  return data;
}