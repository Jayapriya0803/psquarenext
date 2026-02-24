import { NextResponse } from "next/server";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL!;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const code = body.code;
    const password = body.password;
    const passwordConfirmation = body.passwordConfirmation;

    // ---- validation ----
    if (!code || !password || !passwordConfirmation) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    if (password !== passwordConfirmation) {
      return NextResponse.json(
        { message: "Passwords do not match" },
        { status: 400 }
      );
    }

    // ---- send to Strapi ----
    const strapiRes = await fetch(`${STRAPI_URL}/api/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code,
        password,
        passwordConfirmation,
      }),
    });

    const data = await strapiRes.json();

    if (!strapiRes.ok) {
      return NextResponse.json(
        {
          message:
            data?.error?.message ||
            "Reset link expired or invalid. Please request a new one.",
        },
        { status: 400 }
      );
    }

    // success
    return NextResponse.json({
      success: true,
      message: "Password reset successful. You can now login.",
    });

  } catch (error) {
    console.error("RESET PASSWORD API ERROR:", error);

    return NextResponse.json(
      { message: "Server error while resetting password" },
      { status: 500 }
    );
  }
}