import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(req) {
  const form = await req.formData();
  const user_id = form.get("user_id");
  const task_id = form.get("task_id");
  const file = form.get("file");

  const today = new Date().toISOString().slice(0, 10);
  const path = `${user_id}/${task_id}/${today}-${file.name}`;

  await supabase.storage
    .from("proofs")
    .upload(path, file);

  const { data } = supabase
    .storage
    .from("proofs")
    .getPublicUrl(path);

  await supabase.from("submissions").insert({
    user_id,
    task_id,
    submission_date: today,
    proof_url: data.publicUrl
  });

  return NextResponse.redirect("/");
}
