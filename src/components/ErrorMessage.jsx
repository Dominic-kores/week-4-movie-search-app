// Receive an error message and an optional retry function.
export default function ErrorMessage({
  message,
  onRetry,
}) {
  return (
    // Announce the error when it appears.
    <div
      role="alert"
      className="my-6 rounded-xl border border-red-400/40 bg-red-950/40 p-5 text-red-100"
    >
      {/* Display the message supplied by the parent component. */}
      <p>{message}</p>

      {/* Render the retry button only when a retry function exists. */}
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-3 rounded-lg border border-red-300 px-4 py-2 font-semibold hover:bg-red-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-200"
        >
          Try again
        </button>
      )}
    </div>
  );
}