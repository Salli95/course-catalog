"use client";

import { useState } from "react";
import useSWR from "swr";
import type { Course } from "@/lib/courses";

const API = process.env.NEXT_PUBLIC_API_URL;

async function fetcher(url: string): Promise<Course[]> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }
  return res.json();
}

export function ElectiveFilter() {
  const [onlyElective, setOnlyElective] = useState(false);
  const query = onlyElective ? "?is_elective=true" : "";
  const { data, error, isLoading } = useSWR<Course[]>(`${API}/courses${query}`, fetcher);

  return (
    <div className="space-y-4">
      <label className="flex items-center gap-2 font-medium cursor-pointer">
        <input
          type="checkbox"
          checked={onlyElective}
          onChange={(e) => setOnlyElective(e.target.checked)}
          className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
        />
        Только элективные курсы
      </label>

      {isLoading && <p className="text-slate-500">Загрузка курсов...</p>}
      {error && <p className="text-red-500">Не удалось загрузить курсы</p>}

      {data && (
        <ul className="list-disc pl-6 space-y-1">
          {data.map((c) => (
            <li key={c.id}>
              <span className="font-semibold text-slate-900">{c.title}</span> — {c.credits} кр.
              {c.isElective && (
                <span className="ml-2 rounded bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800">
                  электив
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

