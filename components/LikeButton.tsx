"use client";

import { useState } from "react";

export type LikeButtonProps = {
  initialLikes: number;
};

export default function LikeButton({ initialLikes }: LikeButtonProps) {
  const [likes, setLikes] = useState<number>(initialLikes);

  return (
    <button
      type="button"
      onClick={() => setLikes((prev) => prev + 1)}
      className="flex w-full items-center justify-center gap-2 rounded-lg border border-rose-200 bg-rose-50 px-4 py-2.5 text-sm font-semibold text-rose-600 transition hover:bg-rose-100 active:scale-95 cursor-pointer"
      aria-label={`Лайков: ${likes}`}
    >
      <span aria-hidden="true">♥</span>
      <span>Лайк</span>
      <span className="rounded-full bg-white px-2 py-0.5 text-xs font-bold text-rose-600 shadow-xs">
        {likes}
      </span>
    </button>
  );
}
