import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

let lastOrderTime: Record<number, number> = {}; // memory lock

export async function POST(req: NextRequest) {
  try {
    const STRAPI = process.env.NEXT_PUBLIC_STRAPI_URL!;
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Login required" }, { status: 401 });
    }

    const body = await req.json();
    const { items, total } = body;

    // 1️⃣ get logged in user
    const userRes = await fetch(`${STRAPI}/api/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const user = await userRes.json();
    if (!user?.id) {
      return NextResponse.json({ message: "User not found" }, { status: 401 });
    }

    /* 🚫 DUPLICATE ORDER PROTECTION */
    const now = Date.now();
    const last = lastOrderTime[user.id] || 0;

    // block second order within 5 seconds
    if (now - last < 5000) {
      return NextResponse.json({
        message: "Order already submitted. Please wait.",
      });
    }

    lastOrderTime[user.id] = now;

    // 2️⃣ create order
    const orderRes = await fetch(`${STRAPI}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        data: {
          items,
          total,
          orderStatus: "pending",
          user: user.id, // attach user relation
        },
      }),
    });

    const data = await orderRes.json();

    return NextResponse.json(data);
  } catch (err) {
    console.log("ORDER ERROR:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}