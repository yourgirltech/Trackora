export function LoadingState({ label }: { label: string }) {
  return (
    <div className="space-y-2 px-5 py-5 sm:px-6" aria-label={label}>
      {[0, 1, 2].map((i) => (
        <div key={i} className="h-8 animate-pulse bg-forest/5" />
      ))}
    </div>
  );
}

export function ErrorState({ message }: { message: string }) {
  return (
    <p className="mx-5 my-5 border border-amber/30 px-4 py-3 text-sm text-amber sm:mx-6">
      {message}
    </p>
  );
}

export function EmptyState({ label }: { label: string }) {
  return <p className="px-5 py-8 text-center text-sm text-stone sm:px-6">{label}</p>;
}
