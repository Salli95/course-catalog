import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "О проекте",
  description: "Информация о лабораторной работе и учебном каталоге курсов",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">
          О проекте
        </h1>
        <p className="mt-2 text-base text-slate-600">
          Учебный проект каталога курсов, созданный в рамках изучения дисциплины «Продвинутые веб-технологии».
        </p>
      </div>

      <section className="space-y-4 rounded-2xl border border-sky-100 bg-white p-6 sm:p-8 shadow-xs">
        <h2 className="text-xl font-bold text-slate-900">
          Цели работы и используемые технологии
        </h2>
        <p className="text-sm leading-relaxed text-slate-600">
          Основная цель проекта — освоение современного стека веб-разработки:
        </p>
        <ul className="list-disc space-y-1.5 pl-5 text-sm text-slate-700">
          <li>
            <strong>Next.js 16 (App Router):</strong> маршрутизация на основе файловой структуры, генерация статических страниц (SSG), динамические параметры роутов.
          </li>
          <li>
            <strong>React 19 Server Components:</strong> практически все страницы и карточки рендерятся на сервере без отправки лишнего JavaScript клиенту.
          </li>
          <li>
            <strong>Client Component:</strong> кнопка лайка изолирована в отдельный клиентский компонент с локальным состоянием и сохранением в <code>localStorage</code>.
          </li>
          <li>
            <strong>TypeScript:</strong> строгая типизация данных курсов и пропсов компонентов.
          </li>
          <li>
            <strong>Tailwind CSS:</strong> адаптивная вёрстка и современный дизайн интерфейса в сине-голубых тонах.
          </li>
        </ul>

        <div className="pt-2">
          <Link
            href="/courses"
            className="inline-flex items-center rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700 shadow-xs"
          >
            Перейти к списку курсов →
          </Link>
        </div>
      </section>
    </div>
  );
}
