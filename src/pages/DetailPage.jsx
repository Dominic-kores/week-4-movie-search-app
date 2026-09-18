// Import hooks for loading and storing movie details.
import { useEffect, useState } from "react";

// Import navigation, route state and dynamic URL parameters.
import {
  Link,
  useLocation,
  useParams,
} from "react-router-dom";

// Import the component that displays movie information.
import MovieDetail from "../components/MovieDetail";

// Import the shared loading indicator.
import LoadingSpinner from "../components/LoadingSpinner";

// Import the shared error message.
import ErrorMessage from "../components/ErrorMessage";

// Import the OMDb request helper.
import { requestOMDb } from "../services/omdb";

// Receive the shared favourites list and update function.
export default function DetailPage({
  favourites,
  onToggle,
}) {
  // Read the selected ID from /movie/:imdbID.
  const { imdbID } = useParams();

  // Read navigation state passed by the movie card.
  const location = useLocation();

  // Track retry requests for the same movie.
  const [attempt, setAttempt] = useState(0);

  // Store the current movie request and its display state.
  const [result, setResult] = useState({
    id: "",
    attempt: -1,
    status: "loading",
    movie: null,
    error: "",
  });

  // Read the search URL saved when opening this movie.
  const origin = location.state?.resultsURL;

  // Use the search home when no valid results URL is available.
  const resultsURL =
    typeof origin === "string" &&
    (origin === "/" || origin.startsWith("/?"))
      ? origin
      : "/";

  // Load details when the selected movie or retry attempt changes.
  useEffect(() => {
    // Allow the current request to be cancelled.
    const controller = new AbortController();

    // Clear old details while the new request loads.
    setResult({
      id: imdbID,
      attempt,
      status: "loading",
      movie: null,
      error: "",
    });

    // Fetch full information for the selected title.
    async function loadMovie() {
      try {
        // Use the IMDb ID and request the complete plot.
        const movie = await requestOMDb(
          {
            i: imdbID,
            plot: "full",
          },
          controller.signal,
        );

        // Save details only if this request is still active.
        if (!controller.signal.aborted) {
          setResult({
            id: imdbID,
            attempt,
            status: "success",
            movie,
            error: "",
          });
        }
      } catch (error) {
        // Show failures without treating cancellation as an error.
        if (!controller.signal.aborted) {
          setResult({
            id: imdbID,
            attempt,
            status: "error",
            movie: null,
            error: error.message,
          });
        }
      }
    }

    // Start loading the selected movie.
    loadMovie();

    // Stop outdated requests when the movie or page changes.
    return () => controller.abort();
  }, [imdbID, attempt]);

  // Confirm that the stored response belongs to this request.
  const current =
    result.id === imdbID &&
    result.attempt === attempt;

  // Determine the current favourite state for this movie.
  const saved = favourites.some(
    (movie) => movie.imdbID === imdbID,
  );

  return (
    // Group the back link and detail request states.
    <section>
      {/* Return to the search query that opened this movie. */}
      <Link
        to={resultsURL}
        className="mb-8 inline-block rounded text-amber-300 hover:underline focus-visible:outline-2 focus-visible:outline-amber-300"
      >
        ← Back to Results
      </Link>

      {/* Show loading while the requested details are unavailable. */}
      {(!current || result.status === "loading") && (
        <LoadingSpinner />
      )}

      {/* Let the user retry a failed detail request. */}
      {current && result.status === "error" && (
        <ErrorMessage
          message={result.error}
          onRetry={() => setAttempt((value) => value + 1)}
        />
      )}

      {/* Render the complete movie after a successful request. */}
      {current && result.status === "success" && (
        <MovieDetail
          key={imdbID}
          movie={result.movie}
          saved={saved}
          onToggle={onToggle}
        />
      )}
    </section>
  );
}