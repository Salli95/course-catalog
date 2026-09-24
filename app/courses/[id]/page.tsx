import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCourse, getCourses } from "@/lib/courses";
import { detailsFor } from "@/lib/course-details";
import LikeButton from "@/components/LikeButton";
import CourseCard from "@/components/CourseCard";

type CoursePageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  const allCourses = await getCourses();
  return allCourses.map((c) => ({
    id: c.id,
  }));
}

export async function generateMetadata({
  params,
}: CoursePageProps): Promise<Metadata> {
  const { id } = await params;
  const course = await getCourse(id);
  return {
    title: course?.title ?? "Курс не найден",
    description: course?.description,
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { id } = await params;
  const course = await getCourse(id);

  if (!course) {
    notFound();
  }

  const details = detailsFor(id);
  const allCourses = await getCourses();
  const relatedCourses = allCourses.filter((c) => c.id !== id).slice(0, 3);

  return (
    <div className="space-y-8">
      <nav className="text-sm text-slate-500">
        <Link href="/courses" className="hover:text-emerald-600 hover:underline">
          ← Все курсы
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-800 font-medium">{details.area}</span>
      </nav>

      <div className="rounded-2xl border border-emerald-100 bg-white p-4 sm:p-8 shadow-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-md bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 border border-emerald-100">
            {details.area}
          </span>
          <span
            className={`rounded-md px-2.5 py-0.5 text-xs font-semibold ${
              course.isElective
                ? "bg-amber-100 text-amber-800"
                : "bg-emerald-600 text-white"
            }`}
          >
            {course.isElective ? "Курс по выбору" : "Обязательный курс"}
          </span>
        </div>

        <h1 className="mt-2.5 text-xl font-extrabold text-slate-900 sm:text-2xl lg:text-3xl leading-snug">
          {course.title}
        </h1>
        <p className="mt-1.5 text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
          {course.description}
        </p>
      </div>

      <div className="grid gap-5 lg:gap-8 lg:grid-cols-[1fr_320px]">
        <section className="space-y-5 rounded-2xl border border-emerald-100 bg-white p-4 sm:p-8 shadow-xs">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Чему вы научитесь
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {details.outcome}
            </p>
          </div>

          <hr className="border-slate-100" />

          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Основные темы курса
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {details.topics.map((topic, index) => (
                <li key={topic} className="flex items-start gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-xs font-bold text-emerald-700">
                    {index + 1}
                  </span>
                  <span>{topic}</span>
                </li>
              ))}
            </ul>
          </div>

          <hr className="border-slate-100" />

          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Предварительные требования
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {details.prerequisites}
            </p>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-emerald-100 bg-white p-4 sm:p-6 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-slate-900">
              Информация о курсе
            </h2>

            <dl className="divide-y divide-slate-100 text-sm">
              <div className="flex justify-between py-2.5">
                <dt className="text-slate-500">Кредиты</dt>
                <dd className="font-semibold text-slate-900">{course.credits}</dd>
              </div>
              <div className="flex justify-between py-2.5">
                <dt className="text-slate-500">Тип курса</dt>
                <dd className="font-semibold text-slate-900">
                  {course.isElective ? "По выбору" : "Обязательный"}
                </dd>
              </div>
              <div className="flex justify-between py-2.5">
                <dt className="text-slate-500">Направление</dt>
                <dd className="font-semibold text-slate-900">{details.area}</dd>
              </div>
            </dl>

            <div className="pt-2">
              <LikeButton key={course.id} courseId={course.id} initialLikes={course.likes} />
              
            </div>
          </div>
        </aside>
      </div>

      {relatedCourses.length > 0 && (
        <section className="space-y-4 pt-6">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            Другие курсы из каталога
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
            {relatedCourses.map((c) => (
              <CourseCard
                key={c.id}
                id={c.id}
                title={c.title}
                description={c.description}
                credits={c.credits}
                likes={c.likes}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
