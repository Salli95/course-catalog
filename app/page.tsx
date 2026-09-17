import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="rounded-2xl border border-slate-200 bg-white p-8 sm:p-10 shadow-xs">
        <div className="max-w-2xl space-y-4">
          <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
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
              className="inline-flex items-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Смотреть все курсы →
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              О проекте
            </Link>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">
            Направления обучения
          </h2>
          <Link
            href="/courses"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            Все курсы →
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <Link
            href="/courses/modern-frontend"
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs transition hover:border-emerald-400 hover:shadow-sm"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
              01 / Frontend
            </span>
            <h3 className="mt-1.5 text-base font-bold text-slate-900">
              React & Next.js
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              React 19, Server Components и роутинг в App Router.
            </p>
          </Link>

          <Link
            href="/courses/backend-fastapi"
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs transition hover:border-amber-400 hover:shadow-sm"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
              02 / Backend
            </span>
            <h3 className="mt-1.5 text-base font-bold text-slate-900">
              Python & FastAPI
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              REST API, валидация через Pydantic и документация.
            </p>
          </Link>

          <Link
            href="/courses/ai-integration"
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs transition hover:border-purple-400 hover:shadow-sm"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
              03 / AI & LLM
            </span>
            <h3 className="mt-1.5 text-base font-bold text-slate-900">
              Интеграция с ИИ
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Подключение OpenAI API и работа с языковыми моделями.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
