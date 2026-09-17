export default function LoadingCourses() {
  return (
    <div className="space-y-6 py-4 animate-pulse">
      <div className="h-8 w-64 rounded-lg bg-slate-200" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="h-44 rounded-xl border border-slate-200 bg-white p-5 space-y-3"
          >
            <div className="h-4 w-20 rounded bg-slate-200" />
            <div className="h-5 w-3/4 rounded bg-slate-200" />
            <div className="h-10 w-full rounded bg-slate-100" />
          </div>
        ))}
      </div>
    </div>
  );
}
