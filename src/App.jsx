// Import the components that define application routes.
import { Route, Routes } from "react-router-dom";

// Import the navigation displayed on every page.
import NavBar from "./components/NavBar";

// Import the component used for storage warnings.
import ErrorMessage from "./components/ErrorMessage";

// Import the search page.
import SearchPage from "./pages/SearchPage";

// Import the movie detail page.
import DetailPage from "./pages/DetailPage";

// Import the saved favourites page.
import FavouritesPage from "./pages/FavouritesPage";

// Import the fallback page for unknown routes.
import NotFoundPage from "./pages/NotFoundPage";

// Import the shared favourites state hook.
import useFavourites from "./hooks/useFavourites";

// Build the application layout and route definitions.
export default function App() {
  // Create one favourites state shared by all pages.
  const {
    favourites,
    toggleFavourite,
    storageError,
  } = useFavourites();

  // Group the props required by the three main pages.
  const sharedProps = {
    favourites,
    onToggle: toggleFavourite,
  };

  return (
    // Apply the application's full-height dark theme.
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Allow keyboard users to skip repeated navigation. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:block focus:bg-amber-300 focus:p-3 focus:text-slate-950"
      >
        Skip to content
      </a>

      {/* Keep the favourites count synchronized with shared state. */}
      <NavBar count={favourites.length} />

      {/* Constrain page content to a readable centred width. */}
      <main
        id="main"
        className="mx-auto max-w-6xl px-5 py-10"
      >
        {/* Show a warning when browser storage cannot save favourites. */}
        {storageError && (
          <ErrorMessage message={storageError} />
        )}

        {/* Render the page matching the current browser URL. */}
        <Routes>
          {/* Display movie search at the home route. */}
          <Route
            path="/"
            element={<SearchPage {...sharedProps} />}
          />

          {/* Read the selected movie ID from the dynamic route. */}
          <Route
            path="/movie/:imdbID"
            element={<DetailPage {...sharedProps} />}
          />

          {/* Display the user's saved movie collection. */}
          <Route
            path="/favourites"
            element={<FavouritesPage {...sharedProps} />}
          />

          {/* Handle URLs that do not match another route. */}
          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Routes>
      </main>

      {/* Credit the provider of the movie information. */}
      <footer className="mx-auto max-w-6xl px-5 py-8 text-sm text-slate-400">
        Movie information provided by OMDb.
      </footer>
    </div>
  );
}