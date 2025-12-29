import { NextResponse } from "next/server";

export async function GET() {
  const params = new URLSearchParams({
    client_id: process.env.WHOP_CLIENT_ID,
    redirect_uri: process.env.WHOP_REDIRECT_URI,
    response_type: "code",
    scope: "identify"
  });

  return NextResponse.redirect(
    "https://whop.com/oauth/authorize?" + params
  );
}
