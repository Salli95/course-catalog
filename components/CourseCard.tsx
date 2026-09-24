import Link from "next/link";
import { detailsFor } from "@/lib/course-details";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
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
    <Card className="group relative flex flex-col justify-between border-emerald-100 hover:border-emerald-300 hover:shadow-md transition">
      <div>
        <CardHeader className="p-5 pb-2">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
            <span className="rounded-md bg-emerald-50 px-2.5 py-0.5 font-medium text-emerald-800 border border-emerald-100">
              {details.area}
            </span>
            <span className="text-emerald-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition font-bold">
              →
            </span>
          </div>

          <CardTitle className="text-base font-bold text-slate-900 group-hover:text-emerald-600 transition line-clamp-1">
            <Link
              href={`/courses/${id}`}
              prefetch={false}
              className="before:absolute before:inset-0 focus:outline-none"
            >
              {title}
            </Link>
          </CardTitle>
        </CardHeader>

        <CardContent className="p-5 pt-1 text-sm text-slate-600">
          <p className="line-clamp-2 leading-relaxed">{description}</p>
        </CardContent>
      </div>

      <CardFooter className="flex items-center justify-between p-5 py-3 text-xs border-t border-slate-100">
        <span className="rounded bg-slate-100 px-2 py-0.5 font-medium text-slate-700">
          {credits} кредитов
        </span>
        <div className="relative z-10">
          <LikeButton courseId={id} initialLikes={likes} compact />
        </div>
      </CardFooter>
    </Card>
  );
}

