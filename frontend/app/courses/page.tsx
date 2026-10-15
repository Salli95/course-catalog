import type { Metadata } from "next";
import Form from "next/form";
import Link from "next/link";
import { getCourses } from "@/lib/courses";
import { filterCourses, first, type Query } from "@/lib/catalog";
import CourseCard from "@/components/CourseCard";

export const metadata: Metadata = {
  title: "Каталог курсов",
  description: "Список доступных курсов по веб-разработке с поиском и фильтрацией",
};

type CoursesPageProps = {
  searchParams: Promise<Query>;
};

export default async function CoursesPage({ searchParams }: CoursesPageProps) {
  const courses = await getCourses();
  const query = await searchParams;
  const filtered = filterCourses(courses, query);

  const q = first(query.q);
  const typeParam = first(query.type);
  const type = ["required", "elective"].includes(typeParam) ? typeParam : "all";

  const sortParam = first(query.sort);
  const sort = ["popular", "credits", "title"].includes(sortParam)
    ? sortParam
    : "default";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
          Все доступные курсы
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Изучайте курсы, фильтруйте по обязательным предметам и сортируйте по популярности.
        </p>
      </div>

      <div className="grid gap-5 lg:gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="h-fit rounded-xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs">
          <Form action="/courses" className="space-y-5" key={JSON.stringify([q, type, sort])}>
            <div>
              <label htmlFor="search-input" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Поиск курса
              </label>
              <input
                id="search-input"
                type="search"
                name="q"
                placeholder="Например: React"
                defaultValue={q}
                maxLength={200}
                  className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div>
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Тип курса
              </span>
              <div className="mt-2 space-y-1.5 text-sm">
                {[
                  ["all", "Все курсы"],
                  ["required", "Обязательные"],
                  ["elective", "По выбору (элективы)"],
                ].map(([val, label]) => (
                  <label key={val} className="flex items-center gap-2 cursor-pointer text-slate-700 hover:text-slate-900">
                    <input
                      type="radio"
                      name="type"
                      value={val}
                      defaultChecked={type === val}
                      className="text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="sort-select" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Сортировка
              </label>
              <select
                id="sort-select"
                name="sort"
                defaultValue={sort}
                className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 bg-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="default">По умолчанию</option>
                <option value="popular">По лайкам</option>
                <option value="credits">По кредитам</option>
                <option value="title">По названию (А–Я)</option>
              </select>
            </div>

            <div className="space-y-2 pt-2">
              <button
                type="submit"
                className="w-full rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 cursor-pointer shadow-xs"
              >
                Применить фильтры
              </button>
              <Link
                href="/courses"
                className="block text-center text-xs font-medium text-slate-500 hover:text-emerald-700"
              >
                Сбросить фильтры
              </Link>
            </div>
          </Form>
        </aside>

        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-200">
            <span>
              Найдено: <strong>{filtered.length}</strong> из {courses.length} курсов
              {q.trim() && ` по запросу «${q.trim()}»`}
            </span>
            <span>
              Сумма кредитов: <strong>{filtered.reduce((sum, c) => sum + c.credits, 0)}</strong>
            </span>
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5">
              {filtered.map((course) => (
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
          ) : (
            <div className="rounded-xl border border-dashed border-slate-300 p-12 text-center">
              <p className="text-base font-semibold text-slate-700">
                Курсы не найдены
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Попробуйте изменить запрос или сбросить фильтры.
              </p>
              <Link
                href="/courses"
                className="mt-4 inline-block rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Показать все курсы
              </Link>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
