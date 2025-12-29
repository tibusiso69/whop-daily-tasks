import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  const { data } = await supabase
    .from("tasks")
    .select("*")
    .eq("active", true);

  return NextResponse.json(data);
}
