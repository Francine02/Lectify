export function SummaryCardSkeleton() {
  return (
    <div className="card overflow-hidden">
      <div className="skeleton aspect-[16/7] w-full rounded-none" />

      <div className="space-y-3 p-4">
        <div className="skeleton h-4 w-2/3" />
        <div className="skeleton h-3 w-24" />
        <div className="skeleton h-3 w-full" />

        <div className="flex gap-2 pt-1">
          <div className="skeleton h-8 flex-1 rounded-xl" />
          <div className="skeleton h-8 w-10 rounded-xl" />
          <div className="skeleton h-8 w-10 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
