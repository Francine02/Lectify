export function QuizCardSkeleton() {
  return (
    <div className="card space-y-3 p-4">
      <div className="flex items-start justify-between gap-2">
        <div className="skeleton size-10 rounded-xl" />
        <div className="skeleton h-5 w-24 rounded-full" />
      </div>

      <div className="skeleton h-4 w-2/3" />
      <div className="skeleton h-3 w-24" />
      <div className="skeleton h-3 w-40" />

      <div className="flex gap-2 pt-1">
        <div className="skeleton h-8 flex-1 rounded-xl" />
        <div className="skeleton h-8 w-20 rounded-xl" />
      </div>
    </div>
  );
}
