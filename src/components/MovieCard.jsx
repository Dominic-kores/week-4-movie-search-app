// Import navigation and access to the current URL.
import { Link, useLocation } from "react-router-dom";

// Import the poster component.
import Poster from "./Poster";

// Import the reusable favourite control.
import FavouriteButton from "./FavouriteButton";

// Receive the movie information and favourite controls.
export default function MovieCard({
  movie,
  saved,
  onToggle,
}) {
  // Read the route from which the movie is being opened.
  const location = useLocation();

  // Preserve the search URL for the detail page's back link.
  const resultsURL =
    location.pathname === "/"
      ? `/${location.search}`
      : "/";

  return (
    // Arrange the poster, information and button vertically.
    <article className="flex h-full flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-4 transition hover:border-slate-600">
      {/* Pass the search location when navigating to movie details. */}
      <Link
        to={`/movie/${movie.imdbID}`}
        state={{ resultsURL }}
        className="group flex-1 rounded-lg focus-visible:outline-2 focus-visible:outline-amber-300"
      >
        {/* Display the poster or its missing-image placeholder. */}
        <Poster
          src={movie.Poster}
          title={movie.Title}
        />

        {/* Display the movie title as the card heading. */}
        <h2 className="mt-4 text-xl font-semibold group-hover:text-amber-300">
          {movie.Title}
        </h2>

        {/* Display the release year and title type. */}
        <p className="mt-2 text-sm text-slate-400">
          {movie.Year || "Year unavailable"}
          {" · "}
          <span className="capitalize">
            {movie.Type || "Title"}
          </span>
        </p>
      </Link>

      {/* Keep saving outside the link so it never opens movie details. */}
      <FavouriteButton
        movie={movie}
        saved={saved}
        onToggle={onToggle}
      />
    </article>
  );
}