// Import hooks for managing state and fetching results.
import { useEffect, useState } from "react";

// Import access to the URL search parameters.
import { useSearchParams } from "react-router-dom";

// Import the search form.
import SearchBar from "../components/SearchBar";

// Import the responsive movie grid.
import MovieGrid from "../components/MovieGrid";

// Import the loading indicator.
import LoadingSpinner from "../components/LoadingSpinner";

// Import the error message component.
import ErrorMessage from "../components/ErrorMessage";

// Import the shared OMDb request helper.
import { requestOMDb } from "../services/omdb";

// Export the page so App.jsx can import it.
export default function SearchPage({
  favourites,
  onToggle,
}) {
  // Read and update the search query in the URL.
  const [params, setParams] = useSearchParams();

  // Remove surrounding whitespace from the submitted query.
  const query = (params.get("q") || "").trim();

  // Allow the same query to be requested again.
  const [attempt, setAttempt] = useState(0);

  // Store the request status, results and error message.
  const [result, setResult] = useState({
    query: "",
    attempt: -1,
    movies: [],
    status: "idle",
    error: "",
  });

  // Fetch movies when the query or retry attempt changes.
  useEffect(() => {
    // Skip the request when no search has been submitted.
    if (!query) return;

    // Allow this request to be cancelled.
    const controller = new AbortController();

    // Clear previous results and display the loading state.
    setResult({
      query,
      attempt,
      movies: [],
      status: "loading",
      error: "",
    });

    // Request matching titles from OMDb.
    async function loadMovies() {
      try {
        // Pass the search term and cancellation signal.
        const data = await requestOMDb(
          { s: query },
          controller.signal,
        );

        // Ignore responses from cancelled requests.
        if (!controller.signal.aborted) {
          setResult({
            query,
            attempt,
            movies: data.Search || [],
            status: "success",
            error: "",
          });
        }
      } catch (error) {
        // Display failures only for the active request.
        if (!controller.signal.aborted) {
          setResult({
            query,
            attempt,
            movies: [],
            status: "error",
            error: error.message,
          });
        }
      }
    }

    // Start loading the search results.
    loadMovies();

    // Cancel the request when the query or page changes.
    return () => controller.abort();
  }, [query, attempt]);

  // Handle a query submitted by the search form.
  function handleSearch(nextQuery) {
    if (nextQuery === query) {
      // Repeat the request when the query is unchanged.
      setAttempt((value) => value + 1);
    } else {
      // Update the URL to trigger a new search.
      setParams({ q: nextQuery });
    }
  }

  // Check that the stored result belongs to the current request.
  const current =
    result.query === query &&
    result.attempt === attempt;

  // Show loading until the current request has finished.
  const loading =
    Boolean(query) &&
    (!current || result.status === "loading");

  return (
    // Group the search form and all possible result states.
    <section>
      {/* Centre the heading and search controls. */}
      <div className="mx-auto mb-10 max-w-3xl">
        {/* Display a short introduction above the heading. */}
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-300">
          Find your next watch
        </p>

        {/* Display the main search heading. */}
        <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
          Discover your next favourite.
        </h1>

        {/* Keep the input synchronized with URL navigation. */}
        <SearchBar
          key={query}
          initialQuery={query}
          onSearch={handleSearch}
        />
      </div>

      {/* Show instructions before the first search. */}
      {!query && (
        <div className="rounded-2xl border border-dashed border-slate-700 px-6 py-16 text-center">
          <h2 className="text-xl font-semibold">
            Search for any movie, series, or episode
          </h2>

          <p className="mt-3 text-slate-400">
            Explore its story and save the titles you love.
          </p>
        </div>
      )}

      {/* Show the spinner while results are loading. */}
      {loading && <LoadingSpinner />}

      {/* Show request errors with a retry button. */}
      {query && current && result.status === "error" && (
        <ErrorMessage
          message={result.error}
          onRetry={() => setAttempt((value) => value + 1)}
        />
      )}

      {/* Display matching movies or an empty-results message. */}
      {query && current && result.status === "success" && (
        result.movies.length > 0 ? (
          <>
            {/* Identify the query used for these results. */}
            <p className="mb-6 text-slate-400">
              Results for{" "}
              <span className="font-semibold text-white">
                “{query}”
              </span>
            </p>

            {/* Render the results with shared favourite controls. */}
            <MovieGrid
              movies={result.movies}
              favourites={favourites}
              onToggle={onToggle}
            />
          </>
        ) : (
          <p
            role="status"
            className="py-16 text-center text-slate-300"
          >
            No results found. Try another title.
          </p>
        )
      )}
    </section>
  );
}