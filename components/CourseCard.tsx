import Link from "next/link";
import { detailsFor } from "@/lib/course-details";

export type CourseCardProps = {
  id: string;
  title: string;
  description: string;
  credits: number;
  likes: number;
};

export default function CourseCard({
  id,
  title,
  description,
  credits,
  likes,
}: CourseCardProps) {
  const details = detailsFor(id);

  return (
    <Link
      href={`/courses/${id}`}
      prefetch={false}
      className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-xs transition hover:-translate-y-0.5 hover:border-blue-400 hover:shadow-sm"
    >
      <div>
        <div className="mb-3 flex items-center justify-between">
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition">
            {details.area}
          </span>
          <span className="text-slate-400 group-hover:text-blue-600 transition">
            →
          </span>
        </div>

        <h2 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition line-clamp-1">
          {title}
        </h2>
        <p className="mt-1.5 text-sm text-slate-600 line-clamp-2">
          {description}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500">
        <span className="font-medium text-slate-700">{credits} кредитов</span>
        <span className="flex items-center gap-1 text-rose-500">
          <span>♥</span>
          <span>{likes}</span>
        </span>
      </div>
    </Link>
  );
}
