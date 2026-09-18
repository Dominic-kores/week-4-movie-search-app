// Import links that navigate without full page reloads.
import { Link, NavLink } from "react-router-dom";

// Receive the current number of saved movies.
export default function NavBar({ count }) {
  // Choose link styles based on the current route.
  function navStyle({ isActive }) {
    // Define spacing and keyboard-focus styles shared by links.
    const base =
      "rounded-lg px-3 py-2 transition " +
      "focus-visible:outline-2 focus-visible:outline-amber-300";

    // Highlight the active link with a yellow text colour.
    return `${base} ${
      isActive
        ? "bg-slate-800 text-amber-300"
        : "text-slate-300 hover:bg-slate-800"
    }`;
  }

  return (
    // Separate the navigation from the page content.
    <header className="border-b border-slate-800">
      {/* Keep navigation centred and allow wrapping on small screens. */}
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-5"
      >
        {/* Return to the search page when the brand is clicked. */}
        <Link
          to="/"
          className="rounded text-xl font-bold tracking-tight focus-visible:outline-2 focus-visible:outline-amber-300"
        >
          Movie
          <span className="text-amber-300">Finder</span>
        </Link>

        {/* Place the page links beside each other. */}
        <div className="flex items-center gap-2">
          {/* Match only the home route when highlighting Search. */}
          <NavLink to="/" end className={navStyle}>
            Search
          </NavLink>

          {/* Open the user's saved movie collection. */}
          <NavLink to="/favourites" className={navStyle}>
            Favourites

            {/* Display the latest favourites count. */}
            <span className="ml-2 rounded bg-slate-700 px-2 py-1 text-sm text-white">
              {count}
            </span>
          </NavLink>
        </div>
      </nav>
    </header>
  );
}