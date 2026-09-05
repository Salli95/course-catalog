"use client";

import { useState } from "react";

export type LikeButtonProps = {
  initialLikes: number;
};

export default function LikeButton({ initialLikes }: LikeButtonProps) {
  const [likes, setLikes] = useState<number>(initialLikes);

  return (
    <button
      onClick={() => setLikes((prev) => prev + 1)}
      className="inline-flex items-center gap-2 px-4 py-2 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 font-medium rounded-lg hover:bg-rose-200 dark:hover:bg-rose-900/50 transition-colors"
    >
      <span>❤️</span>
      <span>{likes}</span>
    </button>
  );
}
