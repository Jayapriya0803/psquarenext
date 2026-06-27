import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, phone, company, amount, message, razorpayOrderId, razorpayPaymentId } = body;

    if (!fullName || !email || !phone || !amount) {
      return NextResponse.json(
        { message: "Full name, email, phone, and amount are required." },
        { status: 400 }
      );
    }

    const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
    const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

    if (!STRAPI_URL) {
      return NextResponse.json(
        { message: "Server configuration error." },
        { status: 500 }
      );
    }

    const strapiRes = await fetch(`${STRAPI_URL}/api/investor-inquiries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : {}),
      },
      body: JSON.stringify({
        data: {
          fullName,
          email,
          phone,
          company: company || "",
          amount: parseFloat(amount),
          message: message || "",
          investorStatus: "pending",
          submittedAt: new Date().toISOString(),
          razorpayOrderId: razorpayOrderId || "",
          razorpayPaymentId: razorpayPaymentId || "",
        },
      }),
    });

    if (!strapiRes.ok) {
      const errText = await strapiRes.text();
      console.error("Strapi investor save failed:", strapiRes.status, errText);
      return NextResponse.json(
        { message: "Failed to save inquiry. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("Invest API error:", err);
    return NextResponse.json(
      { message: "Server error. Please try again." },
      { status: 500 }
    );
  }
}