import { useState } from "react";

export default function SearchBar({
  initialQuery,
  onSearch,
}) {
  // This state tracks the text currently being typed.
  // It is separate from the submitted query used to fetch results.
  const [input, setInput] = useState(initialQuery);

  function handleSubmit(event) {
    // Prevent the form's normal full-page reload.
    event.preventDefault();

    // Remove surrounding whitespace before searching.
    const query = input.trim();

    // Do not send empty or whitespace-only searches to the API.
    if (query) {
      onSearch(query);
    }
  }

  return (
    // A form supports both clicking Search and pressing Enter.
    <form
      onSubmit={handleSubmit}
      role="search"
      className="flex flex-col gap-3 sm:flex-row"
    >
      {/* The label remains available to screen readers. */}
      <label
        htmlFor="movie-search"
        className="sr-only"
      >
        Movie title
      </label>

      <input
        id="movie-search"
        type="search"
        value={input}
        onChange={(event) => setInput(event.target.value)}
        placeholder="Search for a movie, series, or episode..."
        required
        className="min-w-0 flex-1 rounded-xl border border-slate-600 bg-slate-900 p-4 text-white placeholder:text-slate-400 focus:border-amber-300 focus:outline-none focus:ring-1 focus:ring-amber-300"
      />

      <button
        type="submit"
        className="rounded-xl bg-amber-300 px-7 py-4 font-semibold text-slate-950 hover:bg-amber-200"
      >
        Search
      </button>
    </form>
  );
}