import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const STRAPI = process.env.NEXT_PUBLIC_STRAPI_URL!;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Not logged in" }, { status: 401 });
  }

  const res = await fetch(`${STRAPI}/api/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  return NextResponse.json(data);
}