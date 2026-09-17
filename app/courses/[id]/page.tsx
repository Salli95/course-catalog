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
        <Link href="/courses" className="hover:text-blue-600 hover:underline">
          ← Все курсы
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-800 font-medium">{details.area}</span>
      </nav>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
            {details.area}
          </span>
          <span
            className={`rounded-full px-3 py-1 text-xs font-bold ${
              course.isElective
                ? "bg-amber-100 text-amber-800"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            {course.isElective ? "Курс по выбору" : "Обязательный курс"}
          </span>
        </div>

        <h1 className="mt-3 text-2xl font-extrabold text-slate-900 sm:text-3xl">
          {course.title}
        </h1>
        <p className="mt-2 text-base text-slate-600 max-w-2xl">
          {course.description}
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <section className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
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
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-blue-600">
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
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
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
              <LikeButton key={course.id} initialLikes={course.likes} />
              <p className="mt-2 text-center text-xs text-slate-400">
                Лайки сохраняются на время текущей сессии
              </p>
            </div>
          </div>
        </aside>
      </div>

      {relatedCourses.length > 0 && (
        <section className="space-y-4 pt-6">
          <h2 className="text-xl font-bold text-slate-900">
            Другие курсы из каталога
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
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
