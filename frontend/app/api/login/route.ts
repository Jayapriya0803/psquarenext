import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: body.identifier,
          password: body.password,
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

    // ⭐ IMPORTANT: send user + jwt to frontend
    const response = NextResponse.json({
      success: true,
      jwt: data.jwt,
      user: data.user,
    });

    // also keep secure cookie session
    response.cookies.set("token", data.jwt, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Login server error" },
      { status: 500 }
    );
  }
}