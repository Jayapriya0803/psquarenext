import { NextResponse } from "next/server";

export async function GET() {
  try {

    const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

    const res = await fetch(`${STRAPI_URL}/api/orders`, {
      cache: "no-store"
    });

    const json = await res.json();

    const orders = (json.data || []).map((order: any) => ({
      id: order.id,
      items: order.items || [],
      total: order.total,
      orderStatus: order.orderStatus,
      createdAt: order.createdAt
    }));

    return NextResponse.json(orders);

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Error loading orders" },
      { status: 500 }
    );
  }
}