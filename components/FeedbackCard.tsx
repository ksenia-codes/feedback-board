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
    <article className="bg-white rounded-lg border p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm font-medium text-black">
            {shoutout.author_name || "Anonymous"}
          </div>
          <div className="text-xs text-slate-400">{time}</div>
        </div>
      </div>

      <p className="mt-3 text-slate-700">{shoutout.message}</p>
    </article>
  );
}
