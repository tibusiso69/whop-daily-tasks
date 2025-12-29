import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  const tokenRes = await fetch("https://whop.com/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: process.env.WHOP_CLIENT_ID,
      client_secret: process.env.WHOP_CLIENT_SECRET,
      code,
      grant_type: "authorization_code",
      redirect_uri: process.env.WHOP_REDIRECT_URI
    })
  });

  const token = await tokenRes.json();

  const userRes = await fetch("https://api.whop.com/api/v2/me", {
    headers: { Authorization: `Bearer ${token.access_token}` }
  });

  const whopUser = await userRes.json();

  const { data: user } = await supabase
    .from("users")
    .upsert({
      whop_user_id: whopUser.id,
      email: whopUser.email
    })
    .select()
    .single();

  return NextResponse.redirect(
    new URL(`/?uid=${user.id}`, req.url)
  );
}
