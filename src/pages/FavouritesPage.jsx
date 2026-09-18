// Import navigation back to the search page.
import { Link } from "react-router-dom";

// Import the shared movie grid.
import MovieGrid from "../components/MovieGrid";

// Receive the saved movies and the shared toggle function.
export default function FavouritesPage({
  favourites,
  onToggle,
}) {
  return (
    // Group the collection heading and saved movies.
    <section>
      {/* Introduce the user's saved collection. */}
      <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-300">
        Your collection
      </p>

      {/* Display the collection title and current movie count. */}
      <h1 className="mb-8 text-4xl font-bold">
        Favourites{" "}
        <span className="text-slate-500">
          ({favourites.length})
        </span>
      </h1>

      {/* Show saved cards when the collection is not empty. */}
      {favourites.length > 0 ? (
        <MovieGrid
          movies={favourites}
          favourites={favourites}
          onToggle={onToggle}
        />
      ) : (
        // Display guidance when no movies have been saved.
        <div className="rounded-2xl border border-dashed border-slate-700 p-10 text-center">
          <p className="text-lg text-slate-300">
            No favourites yet. Start searching and save
            movies you love!
          </p>

          {/* Give the user a direct route back to movie search. */}
          <Link
            to="/"
            className="mt-6 inline-block rounded-lg bg-amber-300 px-5 py-3 font-semibold text-slate-950 hover:bg-amber-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
          >
            Find a movie
          </Link>
        </div>
      )}
    </section>
  );
}