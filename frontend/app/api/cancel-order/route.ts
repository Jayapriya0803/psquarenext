import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { orderId } = body;

    if (!orderId) {
      return NextResponse.json(
        { error: "Order ID missing" },
        { status: 400 }
      );
    }

    const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

    if (!STRAPI_URL) {
      return NextResponse.json(
        { error: "Strapi URL not configured" },
        { status: 500 }
      );
    }

    // update order status in Strapi
    const strapiRes = await fetch(`${STRAPI_URL}/api/orders/${orderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          orderStatus: "cancelled",
        },
      }),
    });

    const data = await strapiRes.json();

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Cancel order error:", error);
    return NextResponse.json(
      { error: "Failed to cancel order" },
      { status: 500 }
    );
  }
}