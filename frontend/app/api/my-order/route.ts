import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const STRAPI = process.env.NEXT_PUBLIC_STRAPI_URL!;

    /* 🔐 read login cookie */
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Not logged in" }, { status: 401 });
    }

    /* 1️⃣ get logged in user */
    const userRes = await fetch(`${STRAPI}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const user = await userRes.json();

    if (!user?.id) {
      return NextResponse.json({ message: "User not found" }, { status: 401 });
    }

    /* 2️⃣ fetch that user's orders (IMPORTANT: populate=*) */
    const ordersRes = await fetch(
      `${STRAPI}/api/orders?filters[users_permissions_user][id][$eq]=${user.id}&populate=*&sort=id:desc`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    const strapiData = await ordersRes.json();

    /* 3️⃣ Convert Strapi → Frontend */
    const cleanedOrders = (strapiData.data || []).map((order: any) => ({
      id: order.id,
      orderStatus: order.orderStatus,
      total: order.total,

      // ⭐⭐⭐ THIS FIXES YOUR DATE
      createdAt: order.createdAt,

      items: order.items || [],
    }));

    return NextResponse.json(cleanedOrders);

  } catch (err) {
    console.error("MY ORDER ERROR:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}