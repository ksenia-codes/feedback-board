import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabaseClient";

export async function GET(request: NextRequest) {
  try {
    // Get all shoutouts for admin review
    const { data: shoutouts, error } = await supabaseAdmin
      .from("shoutouts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(shoutouts);
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, approved } = body;

    if (!id) {
      return NextResponse.json({ error: "Missing shoutout ID" }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from("shoutouts")
      .update({ approved })
      .eq("id", id)
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data?.[0]);
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 });
  }
}