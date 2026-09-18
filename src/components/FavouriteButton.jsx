// Receive the movie, its saved status and the toggle function.
export default function FavouriteButton({
  movie,
  saved,
  onToggle,
}) {
  // Describe the action using the movie's title.
  const label = saved
    ? `Remove ${movie.Title} from favourites`
    : `Add ${movie.Title} to favourites`;

  return (
    // Expose the saved state through aria-pressed.
    <button
      type="button"
      aria-label={label}
      aria-pressed={saved}
      onClick={() => onToggle(movie)}
      className={`inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 ${
        saved
          ? "border-amber-300/50 bg-amber-300/10 text-amber-200"
          : "border-slate-600 text-slate-200 hover:border-amber-300"
      }`}
    >
      {/* Display a filled heart when the movie is saved. */}
      <span aria-hidden="true" className="text-lg">
        {saved ? "♥" : "♡"}
      </span>

      {/* Change the action text to match the saved state. */}
      {saved ? "Remove" : "Add to favourites"}
    </button>
  );
}