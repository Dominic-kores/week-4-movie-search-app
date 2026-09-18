export default function LoadingSpinner() {
  return (
    // Announce loading without requiring the user to see the spinner.
    <div
      role="status"
      className="flex items-center justify-center gap-3 py-12 text-slate-300"
    >
      <span
        aria-hidden="true"
        className="h-6 w-6 animate-spin rounded-full border-2 border-slate-700 border-t-amber-300 motion-reduce:animate-none"
      />

      Loading movies…
    </div>
  );
}