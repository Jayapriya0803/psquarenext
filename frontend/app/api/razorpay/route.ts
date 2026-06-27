import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: NextRequest) {
  try {
    const { amount } = await req.json();

    const key_id = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    if (!key_id || !key_secret) {
      return NextResponse.json(
        { message: "Razorpay configuration missing." },
        { status: 500 }
      );
    }

    // ✅ Create instance INSIDE the function, not at module level
    const razorpay = new Razorpay({
      key_id,
      key_secret,
    });

    const order = await razorpay.orders.create({
      amount: Math.round(parseFloat(amount) * 100), // convert to paise
      currency: "INR",
      receipt: `invest_${Date.now()}`,
    });

    return NextResponse.json(order, { status: 200 });
  } catch (err) {
    console.error("Razorpay order error:", err);
    return NextResponse.json(
      { message: "Failed to create payment order." },
      { status: 500 }
    );
  }
}