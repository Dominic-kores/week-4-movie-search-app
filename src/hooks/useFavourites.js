import { useEffect, useState } from "react";

// Using one constant prevents spelling differences between reads and writes.
const STORAGE_KEY = "movieFinder.favourites";

function readFavourites() {
  try {
    // localStorage stores text, so JSON.parse converts it back into an array.
    // If nothing has been saved, use an empty array.
    const stored = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]",
    );

    // A valid JSON value is not necessarily a valid favourites list.
    if (!Array.isArray(stored)) {
      return [];
    }

    // Ignore damaged entries that do not contain the required fields.
    const validMovies = stored.filter(
      (movie) =>
        movie &&
        typeof movie.imdbID === "string" &&
        typeof movie.Title === "string",
    );

    // A Map keeps one entry per IMDb ID, removing duplicates.
    return [
      ...new Map(
        validMovies.map((movie) => [movie.imdbID, movie]),
      ).values(),
    ];
  } catch {
    // Invalid JSON or unavailable storage should not crash the app.
    return [];
  }
}

export default function useFavourites() {
  // Passing the function itself makes this a lazy initializer.
  // React reads storage when initializing state, not on every render.
  const [favourites, setFavourites] = useState(readFavourites);

  const [storageError, setStorageError] = useState("");

  useEffect(() => {
    try {
      // Convert the array into text before saving it.
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(favourites),
      );

      setStorageError("");
    } catch {
      // State still works during this visit even if persistent storage fails.
      setStorageError(
        "Favourites work for this visit, but could not be saved on this device.",
      );
    }
  }, [favourites]); // Save again whenever the favourites array changes.

  function toggleFavourite(movie) {
    // Use a functional update because the next value depends on current state.
    setFavourites((current) => {
      const alreadySaved = current.some(
        (item) => item.imdbID === movie.imdbID,
      );

      if (alreadySaved) {
        // filter creates a new array without modifying the existing state.
        return current.filter(
          (item) => item.imdbID !== movie.imdbID,
        );
      }

      // Keep only the information needed to render a favourite card.
      const { imdbID, Title, Year, Poster, Type } = movie;

      // Create a new array containing the existing favourites and new movie.
      return [
        ...current,
        { imdbID, Title, Year, Poster, Type },
      ];
    });
  }

  return {
    favourites,
    toggleFavourite,
    storageError,
  };
}