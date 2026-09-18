import MovieCard from "./MovieCard";

export default function MovieGrid({
  movies,
  favourites,
  onToggle,
}) {
  return (
    // Tailwind creates one mobile, two tablet, and three desktop columns.
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {movies.map((movie) => {
        // Check shared favourites so each card displays the correct heart.
        const saved = favourites.some(
          (item) => item.imdbID === movie.imdbID,
        );

        return (
          <MovieCard
            // Use a stable movie ID so React can identify each list item.
            key={movie.imdbID}
            movie={movie}
            saved={saved}
            onToggle={onToggle}
          />
        );
      })}
    </div>
  );
}