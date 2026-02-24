import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = body.email?.trim().toLowerCase();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    // send request to Strapi
    const strapiRes = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/forgot-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    const data = await strapiRes.json();

    if (!strapiRes.ok) {
      return NextResponse.json(
        { message: data?.error?.message || "Unable to send reset email" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Reset link sent to your email",
    });

  } catch (error) {
    console.error("FORGOT PASSWORD ERROR:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}