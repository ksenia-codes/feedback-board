"use client";
import React, { useState } from "react";

export default function FeedbackForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) {
      setStatus("error");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/shoutouts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ author_name: name || null, message }),
      });

      if (!res.ok) {
        setStatus("error");
        return;
      }

      setStatus("ok");
      setName("");
      setMessage("");
      setTimeout(() => setStatus("idle"), 2500);
    } catch (err) {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name (optional)"
        className="w-full rounded-md border border-slate-200 px-3 py-2 sm:px-4 sm:py-3 focus:outline-none focus:ring-2 focus:ring-indigo-200 text-black text-sm sm:text-base"
      />
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Your feedback"
        rows={4}
        className="w-full rounded-md border border-slate-200 px-3 py-2 sm:px-4 sm:py-3 focus:outline-none focus:ring-2 focus:ring-indigo-200 text-black text-sm sm:text-base"
      />
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-3 py-2 sm:px-4 sm:py-2 text-white hover:bg-indigo-700 disabled:opacity-50 text-sm sm:text-base whitespace-nowrap transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M5 12h14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 5l7 7-7 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Post Shout-out
        </button>

        {status === "ok" && (
          <span className="text-xs sm:text-sm text-green-600">
            Thanks — your shout-out is pending approval.
          </span>
        )}
        {status === "error" && (
          <span className="text-xs sm:text-sm text-red-600">Please enter a message.</span>
        )}
      </div>
    </form>
  );
}
