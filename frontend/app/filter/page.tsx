import { ElectiveFilter } from "@/components/ElectiveFilter";

export default function FilterPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-xs">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">Фильтр курсов</h1>
        <ElectiveFilter />
      </div>
    </div>
  );
}

