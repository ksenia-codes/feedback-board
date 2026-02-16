import React from "react";

interface Shoutout {
  created_at: string;
  author_name?: string;
  likes_count?: number;
  message: string;
}

export default function FeedbackCard({ shoutout }: { shoutout: Shoutout }) {
  const time = new Date(shoutout.created_at).toLocaleString();
  return (
    <article className="bg-white rounded-lg border border-slate-200 p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="text-xs sm:text-sm font-medium text-black truncate">
            {shoutout.author_name || "Anonymous"}
          </div>
          <div className="text-xs text-slate-400">{time}</div>
        </div>
      </div>

      <p className="mt-2 sm:mt-3 text-sm sm:text-base text-slate-700 break-words">{shoutout.message}</p>
    </article>
  );
}
