import FeedbackForm from "../components/FeedbackForm";
import FeedbackCard from "../components/FeedbackCard";
import { supabase } from "../lib/supabaseClient";

export default async function Page() {
  const { data: shoutouts } = await supabase
    .from("shoutouts")
    .select("*")
    // .eq("approved", true)
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-8 sm:space-y-12">
      <section className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-slate-200">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-2 text-black">
          Share Your Love!
        </h2>
        <p className="text-sm sm:text-base text-slate-500 mb-4">
          Write a short shout-out to someone in the community.
        </p>
        <FeedbackForm />
      </section>

      <section>
        <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-black">
          Recent Shout-outs
        </h3>
        <div className="grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {shoutouts &&
            shoutouts.map((s) => <FeedbackCard key={s.id} shoutout={s} />)}
        </div>
      </section>
    </div>
  );
}
