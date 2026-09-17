import Link from "next/link";
import { detailsFor } from "@/lib/course-details";
import LikeButton from "@/components/LikeButton";

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
    <div className="group relative flex flex-col justify-between rounded-xl border border-sky-100 bg-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-sm">
      <div>
        <div className="mb-3 flex items-center justify-between">
          <span className="rounded-md bg-sky-50 px-2.5 py-0.5 text-xs font-semibold text-sky-700 border border-sky-100">
            {details.area}
          </span>
          <span className="text-sky-400 group-hover:text-sky-600 group-hover:translate-x-0.5 transition font-bold text-sm">
            →
          </span>
        </div>

        <h2 className="text-base font-bold text-slate-900 group-hover:text-sky-600 transition line-clamp-1">
          <Link
            href={`/courses/${id}`}
            prefetch={false}
            className="before:absolute before:inset-0 focus:outline-none"
          >
            {title}
          </Link>
        </h2>
        <p className="mt-2 text-sm text-slate-600 line-clamp-2 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
        <span className="inline-flex items-center gap-1 rounded bg-slate-100 px-2 py-0.5 font-medium text-slate-700">
          {credits} кредитов
        </span>
        <div className="relative z-10">
          <LikeButton courseId={id} initialLikes={likes} compact />
        </div>
      </div>
    </div>
  );
}
