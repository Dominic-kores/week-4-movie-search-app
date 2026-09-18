// Import the poster component.
import Poster from "./Poster";

// Import the shared favourite button.
import FavouriteButton from "./FavouriteButton";

// Replace missing API values with a readable message.
function display(value) {
  return value && value !== "N/A"
    ? value
    : "Not available";
}

// Receive full movie information and favourite controls.
export default function MovieDetail({
  movie,
  saved,
  onToggle,
}) {
  // Find the Rotten Tomatoes rating when the API provides one.
  const rottenTomatoes = movie.Ratings?.find(
    (rating) => rating.Source === "Rotten Tomatoes",
  )?.Value;

  // Convert the genre string into individual tags.
  const genres =
    movie.Genre && movie.Genre !== "N/A"
      ? movie.Genre.split(", ")
      : [];

  return (
    // Stack content on mobile and use two columns on larger screens.
    <article className="grid items-start gap-8 md:grid-cols-[280px_1fr]">
      {/* Display the full poster beside the movie information. */}
      <Poster
        src={movie.Poster}
        title={movie.Title}
      />

      {/* Group the title, story, credits and ratings. */}
      <div>
        {/* Identify whether the title is a movie, series or episode. */}
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-300">
          {movie.Type || "Movie"}
        </p>

        {/* Use the movie title as the page's main heading. */}
        <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
          {movie.Title}
        </h1>

        {/* Display the year, age classification and runtime. */}
        <p className="mt-4 text-slate-300">
          {display(movie.Year)}
          {" · "}
          {display(movie.Rated)}
          {" · "}
          {display(movie.Runtime)}
        </p>

        {/* Render each available genre as a separate tag. */}
        <ul
          aria-label="Genres"
          className="mt-5 flex flex-wrap gap-2"
        >
          {genres.map((genre) => (
            <li
              key={genre}
              className="rounded-full border border-slate-700 px-3 py-1 text-sm"
            >
              {genre}
            </li>
          ))}
        </ul>

        {/* Introduce the plot section. */}
        <h2 className="mt-8 text-xl font-semibold">
          The story
        </h2>

        {/* Display the full plot returned by OMDb. */}
        <p className="mt-3 leading-8 text-slate-300">
          {display(movie.Plot)}
        </p>

        {/* Pair each detail label with its value. */}
        <dl className="my-8 grid gap-5 sm:grid-cols-2">
          {/* Display the director's name. */}
          <div>
            <dt className="text-sm text-slate-400">
              Director
            </dt>

            <dd className="mt-1">
              {display(movie.Director)}
            </dd>
          </div>

          {/* Display the main actors. */}
          <div>
            <dt className="text-sm text-slate-400">
              Actors
            </dt>

            <dd className="mt-1">
              {display(movie.Actors)}
            </dd>
          </div>

          {/* Format an available IMDb rating as a score out of ten. */}
          <div>
            <dt className="text-sm text-slate-400">
              IMDb rating
            </dt>

            <dd className="mt-1 font-semibold text-amber-300">
              {movie.imdbRating &&
              movie.imdbRating !== "N/A"
                ? `${movie.imdbRating} / 10`
                : "Not available"}
            </dd>
          </div>

          {/* Display the optional Rotten Tomatoes score. */}
          <div>
            <dt className="text-sm text-slate-400">
              Rotten Tomatoes
            </dt>

            <dd className="mt-1 font-semibold text-amber-300">
              {display(rottenTomatoes)}
            </dd>
          </div>
        </dl>

        {/* Allow saving or removing the movie from this page. */}
        <FavouriteButton
          movie={movie}
          saved={saved}
          onToggle={onToggle}
        />
      </div>
    </article>
  );
}