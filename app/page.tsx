import Link from "next/link";
import { getCourses } from "@/lib/courses";
import CourseCard from "@/components/CourseCard";

export default async function HomePage() {
  const courses = await getCourses();
  const popularCourses = [...courses]
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 3);

  return (
    <div className="space-y-10">
      <section className="rounded-2xl border border-sky-100 bg-white p-8 sm:p-10 shadow-xs">
        <div className="max-w-2xl space-y-4">
          <span className="inline-block rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 border border-sky-100">
            Лабораторная работа · Продвинутые веб-технологии
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Каталог курсов по веб-разработке
          </h1>
          <p className="text-base leading-relaxed text-slate-600">
            Учебный проект для выбора и изучения курсов: современный фронтенд на React и Next.js, бэкенд на Python и FastAPI, базы данных и интеграция с LLM.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/courses"
              className="inline-flex items-center rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700 shadow-xs"
            >
              Смотреть все курсы ({courses.length}) →
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center rounded-xl border border-sky-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-sky-50"
            >
              О проекте
            </Link>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Популярные курсы
            </h2>
            
          </div>
          
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
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
