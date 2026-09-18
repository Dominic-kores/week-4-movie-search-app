// Import navigation back to a valid application route.
import { Link } from "react-router-dom";

// Display a fallback for unknown URLs.
export default function NotFoundPage() {
  return (
    // Centre the message within the available page area.
    <section className="py-16 text-center">
      {/* Identify the missing-page state. */}
      <p className="text-amber-300">404</p>

      {/* Explain that the requested page does not exist. */}
      <h1 className="mt-3 text-4xl font-bold">
        Page not found
      </h1>

      {/* Give a short explanation of the problem. */}
      <p className="mt-4 text-slate-400">
        That page is not part of MovieFinder.
      </p>

      {/* Provide a working route back to the application. */}
      <Link
        to="/"
        className="mt-6 inline-block rounded text-amber-300 underline focus-visible:outline-2 focus-visible:outline-amber-300"
      >
        Return to search
      </Link>
    </section>
  );
}