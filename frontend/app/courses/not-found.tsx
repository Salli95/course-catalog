import Link from "next/link";

export default function CourseNotFound() {
  return (
    <div className="mx-auto max-w-md py-16 text-center">
      <span className="text-6xl font-black text-slate-300">404</span>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">
        Курс не найден
      </h1>
      <p className="mt-2 text-sm text-slate-600">
        Запрашиваемый курс не существует или был перемещен. Вы можете вернуться в каталог и выбрать другой курс.
      </p>
      <div className="mt-6">
        <Link
          href="/courses"
          className="inline-flex items-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          ← Вернуться ко всем курсам
        </Link>
      </div>
    </div>
  );
}
