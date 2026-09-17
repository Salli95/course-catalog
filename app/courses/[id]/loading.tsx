export default function LoadingCourse() {
  return (
    <div className="space-y-6 py-4 animate-pulse max-w-3xl">
      <div className="h-4 w-32 rounded bg-slate-200" />
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 space-y-4">
        <div className="h-6 w-24 rounded-full bg-slate-200" />
        <div className="h-8 w-2/3 rounded bg-slate-200" />
        <div className="h-12 w-full rounded bg-slate-100" />
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 space-y-3">
        <div className="h-5 w-48 rounded bg-slate-200" />
        <div className="h-4 w-full rounded bg-slate-100" />
        <div className="h-4 w-4/5 rounded bg-slate-100" />
      </div>
    </div>
  );
}
