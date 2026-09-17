"use client";

import { useState, useEffect } from "react";

export type LikeButtonProps = {
  initialLikes: number;
  courseId?: string;
  compact?: boolean;
};

export default function LikeButton({
  initialLikes,
  courseId,
  compact = false,
}: LikeButtonProps) {
  const [likes, setLikes] = useState<number>(initialLikes);

  useEffect(() => {
    if (!courseId) return;

    try {
      const saved = localStorage.getItem(`course_likes_${courseId}`);
      if (saved !== null) {
        const parsed = parseInt(saved, 10);
        if (!isNaN(parsed)) {
          setLikes(parsed);
        }
      }
    } catch {
      // Игнорируем ошибки при недоступном localStorage
    }

    const handleSync = (e: Event) => {
      const event = e as CustomEvent<{ courseId: string; likes: number }>;
      if (event.detail?.courseId === courseId) {
        setLikes(event.detail.likes);
      }
    };

    window.addEventListener("course_like_updated", handleSync);
    return () => {
      window.removeEventListener("course_like_updated", handleSync);
    };
  }, [courseId]);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setLikes((prev) => {
      const next = prev + 1;
      if (courseId) {
        try {
          localStorage.setItem(`course_likes_${courseId}`, String(next));
          window.dispatchEvent(
            new CustomEvent("course_like_updated", {
              detail: { courseId, likes: next },
            })
          );
        } catch {
          // Игнорируем ошибки квоты
        }
      }
      return next;
    });
  };

  if (compact) {
    return (
      <button
        type="button"
        onClick={handleLike}
        className="flex items-center gap-1.5 rounded-lg border border-sky-200 bg-sky-50/80 px-2.5 py-1 text-xs font-semibold text-sky-700 transition hover:bg-sky-100 hover:border-sky-300 active:scale-95 cursor-pointer shadow-2xs"
        aria-label={`Лайков: ${likes}`}
        title="Поставить лайк"
      >
        <svg
          className="h-3.5 w-3.5 fill-sky-500 text-sky-500 transition-transform active:scale-125"
          viewBox="0 0 24 24"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
        <span>{likes}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleLike}
      className="flex w-full items-center justify-center gap-2 rounded-xl border border-sky-200 bg-sky-50/80 px-4 py-2.5 text-sm font-semibold text-sky-800 transition-all hover:bg-sky-100 hover:border-sky-300 active:scale-95 cursor-pointer shadow-xs"
      aria-label={`Лайков: ${likes}`}
    >
      <svg className="h-4 w-4 fill-sky-600 text-sky-600" viewBox="0 0 24 24">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
      <span>Поставить лайк</span>
      <span className="ml-1 rounded-full bg-white px-2.5 py-0.5 text-xs font-bold text-sky-700 border border-sky-100 shadow-xs">
        {likes}
      </span>
    </button>
  );
}
