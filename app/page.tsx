import Link from "next/link";
import { getCourses } from "@/lib/courses";
import CourseCard from "@/components/CourseCard";

export default async function HomePage() {
  const courses = await getCourses();
  const popularCourses = [...courses]
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 3);

  return (
    <div className="space-y-6 sm:space-y-10">
      <section className="rounded-2xl border border-emerald-100 bg-white p-5 sm:p-8 shadow-xs">
        <div className="max-w-2xl space-y-3 sm:space-y-4">
          <span className="inline-block rounded-full bg-emerald-50 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[11px] sm:text-xs font-semibold text-emerald-800 border border-emerald-100">
            Лабораторная работа · Продвинутые веб-технологии
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl leading-tight">
            Каталог курсов по веб-разработке
          </h1>
          <p className="text-sm sm:text-base leading-relaxed text-slate-600">
            Учебный проект для выбора и изучения курсов: современный фронтенд на React и Next.js, бэкенд на Python и FastAPI, базы данных и интеграция с LLM.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4 pt-2">
            <Link
              href="/courses"
              className="inline-flex justify-center items-center rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 shadow-xs text-center"
            >
              Смотреть все курсы ({courses.length}) →
            </Link>
            <Link
              href="/about"
              className="inline-flex justify-center items-center rounded-xl border border-emerald-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-emerald-50 text-center"
            >
              О проекте
            </Link>
          </div>
        </div>
      </section>

      <section className="space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            Популярные курсы
          </h2>
          <Link
            href="/courses"
            className="text-xs sm:text-sm font-semibold text-emerald-600 hover:text-emerald-800 hover:underline"
          >
            Все курсы →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5">
          {popularCourses.map((course) => (
            <CourseCard
              key={course.id}
              id={course.id}
              title={course.title}
              description={course.description}
              credits={course.credits}
              likes={course.likes}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
