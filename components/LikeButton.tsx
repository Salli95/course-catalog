"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

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
    } catch {}

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
        } catch {}
      }
      return next;
    });
  };

  if (compact) {
    return (
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={handleLike}
        className="h-8 gap-1.5 px-2.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800"
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
    );
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="default"
      onClick={handleLike}
      className="w-full gap-2 border-emerald-200 bg-emerald-50/70 text-sm font-semibold text-emerald-800 hover:bg-emerald-100 hover:border-emerald-300"
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
  );
}
