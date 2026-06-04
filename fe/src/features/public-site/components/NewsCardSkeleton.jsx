export default function NewsCardSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-slate-900 shadow-sm animate-pulse aspect-4/5 w-full">
      <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

      <div className="absolute left-0 top-0 p-5">
        <div className="h-6 w-24 bg-slate-700/50 rounded-full backdrop-blur"></div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-5 space-y-3">
        <div className="h-4 w-1/3 bg-slate-700/50 rounded"></div>
        <div className="h-6 w-full bg-slate-700/50 rounded"></div>
        <div className="h-4 w-full bg-slate-700/50 rounded"></div>
        <div className="h-4 w-5/6 bg-slate-700/50 rounded"></div>
        <div className="mt-5 h-4 w-32 bg-slate-700/50 rounded"></div>
      </div>
    </div>
  );
}
