"use client";

import React, { useState } from "react";

interface Shoutout {
  id?: string;
  created_at: string;
  author_name?: string;
  likes_count?: number;
  message: string;
}

export default function FeedbackCard({ shoutout }: { shoutout: Shoutout }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const time = new Date(shoutout.created_at).toLocaleString();

  const handleDelete = async () => {
    if (!shoutout.id) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this shout-out? This action cannot be undone.",
    );

    if (!confirmed) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/admin?id=${shoutout.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete shout-out");
      }

      // Refresh the page to update the list
      window.location.reload();
    } catch (error) {
      alert("Failed to delete shout-out. Please try again.");
      console.error("Delete error:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <article className="bg-white rounded-lg border border-slate-200 p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow relative">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="text-xs sm:text-sm font-medium text-black truncate">
            {shoutout.author_name || "Anonymous"}
          </div>
          <div className="text-xs text-slate-400">{time}</div>
        </div>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="text-red-500 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed p-1 rounded transition-colors"
          title="Delete shout-out"
        >
          {isDeleting ? (
            <svg
              className="w-4 h-4 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          ) : (
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          )}
        </button>
      </div>

      <p className="mt-2 sm:mt-3 text-sm sm:text-base text-slate-700 break-words">
        {shoutout.message}
      </p>
    </article>
  );
}
