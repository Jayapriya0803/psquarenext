import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: NextRequest) {
  try {
    const { amount } = await req.json();

    const order = await razorpay.orders.create({
      amount: Math.round(parseFloat(amount) * 100), // paise
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