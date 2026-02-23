import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    let identifier: string = body.identifier || "";
    const password: string = body.password || "";

    // ---- FIX 1: remove accidental spaces ----
    identifier = identifier.trim();

    // ---- FIX 2: normalize username/email ----
    // if email -> lowercase
    // if username -> also lowercase (Strapi usernames are case-sensitive)
    identifier = identifier.toLowerCase();

    if (!identifier || !password) {
      return NextResponse.json(
        { message: "Username/Email and password required" },
        { status: 400 }
      );
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: identifier,
          password: password,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { message: data?.error?.message || "Invalid credentials" },
        { status: 400 }
      );
    }

    // ⭐ send user + jwt to frontend
    const response = NextResponse.json({
      success: true,
      jwt: data.jwt,
      user: data.user,
    });

    // (UNCHANGED — your session settings kept exactly)
    response.cookies.set("token", data.jwt, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return NextResponse.json(
      { message: "Login server error" },
      { status: 500 }
    );
  }
}