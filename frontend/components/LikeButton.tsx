"use client";

import { useState } from "react";
import type { Course } from "@/lib/courses";
import { Button } from "@/components/ui/button";

const API = process.env.NEXT_PUBLIC_API_URL;

export type LikeButtonProps = {
  courseId: string;
  initialLikes: number;
  compact?: boolean;
};

export function LikeButton({
  courseId,
  initialLikes,
  compact = false,
}: LikeButtonProps) {
  const [likes, setLikes] = useState<number>(initialLikes);
  const [failed, setFailed] = useState(false);

  async function handleClick(e?: React.MouseEvent) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setFailed(false);
    try {
      // Простой POST-запрос: без тела и без нестандартных заголовков
      // Браузер отправляет его сразу, без предварительного OPTIONS (preflight)
      const res = await fetch(`${API}/courses/${courseId}/like`, {
        method: "POST",
      });
      if (!res.ok) {
        throw new Error(`Ошибка лайка: ${res.status}`);
      }
      const updatedCourse: Course = await res.json();
      setLikes(updatedCourse.likes);
    } catch {
      setFailed(true);
    }
  }

  if (compact) {
    return (
      <div className="inline-flex flex-col items-start gap-1">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleClick}
          className="h-8 gap-1.5 px-2.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 cursor-pointer"
          aria-label={`Лайков: ${likes}`}
          title="Поставить лайк"
        >
          <svg
            className="h-3.5 w-3.5 fill-emerald-500 text-emerald-500"
            viewBox="0 0 24 24"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <span>{likes}</span>
        </Button>
        {failed && <p className="text-xs text-red-600">Ошибка</p>}
      </div>
    );
  }

  return (
    <div className="inline-flex flex-col items-start gap-1 w-full">
      <Button
        type="button"
        variant="outline"
        size="default"
        onClick={handleClick}
        className="w-full gap-2 border-emerald-200 bg-emerald-50/70 text-sm font-semibold text-emerald-800 hover:bg-emerald-100 hover:border-emerald-300 cursor-pointer transition"
        aria-label={`Лайков: ${likes}`}
      >
        <svg
          className="h-4 w-4 fill-emerald-600 text-emerald-600"
          viewBox="0 0 24 24"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
        <span>Поставить лайк</span>
        <span className="ml-1 rounded-full bg-white px-2.5 py-0.5 text-xs font-bold text-emerald-700 border border-emerald-100 shadow-2xs">
          {likes}
        </span>
      </Button>
      {failed && <p className="text-xs text-red-600">Не удалось поставить лайк</p>}
    </div>
  );
}

export default LikeButton;
