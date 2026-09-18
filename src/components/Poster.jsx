// Import state for tracking failed poster images.
import { useState } from "react";

// Receive the poster URL and movie title.
export default function Poster({ src, title }) {
  // Remember the image URL that failed to load.
  const [failedSource, setFailedSource] = useState(null);

  // Check whether the poster is missing or unavailable.
  const unavailable =
    !src ||
    src === "N/A" ||
    failedSource === src;

  // Display a placeholder when the poster cannot be shown.
  if (unavailable) {
    return (
      <div
        role="img"
        aria-label={`No poster available for ${title}`}
        className="flex aspect-[2/3] items-center justify-center rounded-lg bg-slate-800 p-6 text-center text-slate-400"
      >
        Poster unavailable
      </div>
    );
  }

  // Display the poster and handle image-loading failures.
  return (
    <img
      src={src}
      alt={`${title} poster`}
      loading="lazy"
      onError={() => setFailedSource(src)}
      className="aspect-[2/3] w-full rounded-lg object-cover"
    />
  );
}