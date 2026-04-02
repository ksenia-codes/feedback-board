"use client";

import React, { useState, useEffect } from "react";

interface Shoutout {
  id: string;
  author_name?: string;
  message: string;
  created_at: string;
  approved?: boolean;
}

export default function AdminPage() {
  const [shoutouts, setShoutouts] = useState<Shoutout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchShoutouts();
  }, []);

  const fetchShoutouts = async () => {
    try {
      const response = await fetch("/api/admin");
      if (!response.ok) throw new Error("Failed to fetch shoutouts");
      const data = await response.json();
      setShoutouts(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateApproval = async (id: string, approved: boolean) => {
    try {
      const response = await fetch("/api/admin", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, approved }),
      });

      if (!response.ok) throw new Error("Failed to update shoutout");

      // Update local state
      setShoutouts(
        shoutouts.map((s) => (s.id === id ? { ...s, approved } : s)),
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-600">Error: {error}</div>;

  const pendingShoutouts = shoutouts.filter((s) => !s.approved);
  const approvedShoutouts = shoutouts.filter((s) => s.approved);

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-8 text-black">Admin Dashboard</h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-black">
            Pending Approval ({pendingShoutouts.length})
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pendingShoutouts.map((shoutout) => (
              <div
                key={shoutout.id}
                className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm"
              >
                <div className="mb-3">
                  <div className="font-medium text-black">
                    {shoutout.author_name || "Anonymous"}
                  </div>
                  <div className="text-sm text-slate-400">
                    {new Date(shoutout.created_at).toLocaleString()}
                  </div>
                </div>
                <p className="text-slate-700 mb-4">{shoutout.message}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => updateApproval(shoutout.id, true)}
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateApproval(shoutout.id, false)}
                    className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
            {pendingShoutouts.length === 0 && (
              <p className="text-slate-500 col-span-full">
                No pending shoutouts
              </p>
            )}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-black">
            Approved Shoutouts ({approvedShoutouts.length})
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {approvedShoutouts.map((shoutout) => (
              <div
                key={shoutout.id}
                className="bg-green-50 border border-green-200 rounded-lg p-4"
              >
                <div className="mb-3">
                  <div className="font-medium text-black">
                    {shoutout.author_name || "Anonymous"}
                  </div>
                  <div className="text-sm text-slate-400">
                    {new Date(shoutout.created_at).toLocaleString()}
                  </div>
                </div>
                <p className="text-slate-700 mb-4">{shoutout.message}</p>
                <button
                  onClick={() => updateApproval(shoutout.id, false)}
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                >
                  Unapprove
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
