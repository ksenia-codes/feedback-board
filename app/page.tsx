import FeedbackForm from "../components/FeedbackForm";
import FeedbackCard from "../components/FeedbackCard";
import { supabase } from "../lib/supabaseClient";

export default async function Page() {
  const { data: shoutouts } = await supabase
    .from("shoutouts")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-8">
      <section className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-2 text-black">
          Share Your Love!
        </h2>
        <p className="text-sm text-slate-500 mb-4">
          Write a short shout-out to someone in the community.
        </p>
        <FeedbackForm />
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-4">Recent Shout-outs</h3>
        <div className="grid gap-4">
          {shoutouts &&
            shoutouts.map((s) => <FeedbackCard key={s.id} shoutout={s} />)}
        </div>
      </section>
    </div>
  );
}
