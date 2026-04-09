export default function Loading() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero skeleton */}
      <div className="skeleton w-full aspect-[21/9] rounded-2xl" />
      {/* Title */}
      <div className="space-y-3">
        <div className="skeleton h-10 w-3/4 rounded-xl" />
        <div className="skeleton h-5 w-full rounded" />
        <div className="skeleton h-5 w-2/3 rounded" />
      </div>
      {/* Badges */}
      <div className="flex gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="skeleton h-8 w-20 rounded-full" />
        ))}
      </div>
      {/* Two columns */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10">
        <div className="space-y-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="skeleton h-10 w-full rounded-lg" />
          ))}
        </div>
        <div className="space-y-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="skeleton h-24 w-full rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
