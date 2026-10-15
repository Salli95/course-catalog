"use client";

import { useEffect } from "react";

export default function Error({
  error,
  retry,
  reset,
}: {
  error: Error & { digest?: string };
  retry?: () => void;
  reset?: () => void;
}) {
  useEffect(() => {
    console.error("Ошибка, перехваченная error.tsx:", error);
  }, [error]);

  const handleRetry = () => {
    if (typeof retry === "function") {
      retry();
    } else if (typeof reset === "function") {
      reset();
    }
  };

  return (
    <main className="p-6">
      <h1 className="mb-2 text-2xl font-bold text-red-600">Что-то пошло не так</h1>
      <p className="mb-4 text-slate-700">
        Не удалось загрузить данные. Возможно, сервер бэкенда не запущен.
      </p>
      <button
        onClick={handleRetry}
        className="rounded-md bg-slate-900 px-4 py-2 text-white hover:bg-slate-800 transition cursor-pointer"
      >
        Попробовать снова
      </button>
    </main>
  );
}

