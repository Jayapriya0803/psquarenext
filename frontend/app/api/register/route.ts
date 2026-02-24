import { NextResponse } from "next/server";

export async function POST(req: Request) {
try {
const body = await req.json();
console.log("FORM DATA:", body);

const STRAPI = process.env.NEXT_PUBLIC_STRAPI_URL;

if (!STRAPI) {
  return NextResponse.json(
    { message: "Strapi URL not found in .env" },
    { status: 500 }
  );
}

const registerRes = await fetch(`${STRAPI}/api/auth/local/register`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    username: body.username,
    email: body.email,
    password: body.password,
  }),
});

const registerData = await registerRes.json();
console.log("REGISTER RESPONSE:", registerData);

if (!registerRes.ok) {
  return NextResponse.json(
    { message: registerData?.error?.message || "Registration failed" },
    { status: 400 }
  );
}

const jwt: string = registerData.jwt;
const userId: number = registerData.user.id;

console.log("NEW USER ID:", userId);

const updateRes = await fetch(`${STRAPI}/api/users/${userId}`, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${jwt}`,
  },
  body: JSON.stringify({
    firstName: body.firstName,
    lastName: body.lastName,
    country: body.country,
    state: body.state,
    city: body.city,
    gst: body.gst,
    mobile: body.mobile,            // ⭐ ADDED
    addressline: body.addressline,  // ⭐ ADDED
  }),
});

const updateData = await updateRes.json();
console.log("UPDATE STATUS:", updateRes.status);
console.log("UPDATE RESPONSE:", updateData);

if (!updateRes.ok) {
  return NextResponse.json(
    { message: "Profile update failed", error: updateData },
    { status: 400 }
  );
}

const response = NextResponse.json({
  success: true,
  user: registerData.user,
});

response.cookies.set("token", jwt, {
  httpOnly: true,
  secure: false,
  sameSite: "lax",
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
});

return response;

} catch (error) {
console.error("REGISTER SERVER ERROR:", error);

return NextResponse.json(
  { message: "Server error during registration" },
  { status: 500 }
);

}
}
