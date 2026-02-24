"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Country, State, City } from "country-state-city";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
Select,
SelectContent,
SelectItem,
SelectTrigger,
SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

export default function RegistrationPage() {
const router = useRouter();

const [loading, setLoading] = useState(false);
const [errorMsg, setErrorMsg] = useState("");

const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [email, setEmail] = useState("");
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [gst, setGst] = useState("");

// ⭐ NEW FIELDS
const [mobile, setMobile] = useState("");
const [addressline, setAddressline] = useState("");

const [countryCode, setCountryCode] = useState("IN");
const [stateCode, setStateCode] = useState("");
const [city, setCity] = useState("");

const countries = Country.getAllCountries();
const states = State.getStatesOfCountry(countryCode);
const cities = stateCode
? City.getCitiesOfState(countryCode, stateCode)
: [];

async function handleSubmit(e: React.FormEvent) {
e.preventDefault();
setLoading(true);
setErrorMsg("");

// simple mobile validation
if (mobile.length < 10) {
  setErrorMsg("Enter a valid mobile number");
  setLoading(false);
  return;
}

const country = Country.getCountryByCode(countryCode)?.name || "";
const state =
  State.getStateByCodeAndCountry(stateCode, countryCode)?.name || "";

try {
  const res = await fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
      firstName,
      lastName,
      country,
      state,
      city,
      gst,
      mobile,
      addressline,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    setErrorMsg(data.message || "Registration failed");
    setLoading(false);
    return;
  }

  router.push("/product");
  router.refresh();
} catch (err) {
  setErrorMsg("Server error. Please try again.");
}

setLoading(false);


}

return ( <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-purple-100 px-4 py-10">

  <Card className="w-full max-w-2xl shadow-xl border border-gray-200 rounded-2xl">
    <CardHeader className="space-y-2 text-center">
      <CardTitle className="text-3xl font-bold text-gray-800">
        Create your account
      </CardTitle>
      <CardDescription>
        Register once — checkout becomes 1-click later
      </CardDescription>
    </CardHeader>

    <CardContent>
      <form onSubmit={handleSubmit} className="space-y-5">

        {errorMsg && (
          <p className="text-sm text-red-500 text-center">{errorMsg}</p>
        )}

        {/* Name */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>First Name</Label>
            <Input
              placeholder="John"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Last Name</Label>
            <Input
              placeholder="Doe"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>

        <Separator />

        {/* Contact */}
        <div className="space-y-2">
          <Label>Mobile Number</Label>
          <Input
            type="tel"
            placeholder="9876543210"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Address Line</Label>
          <textarea
            className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Door No, Street, Area"
            value={addressline}
            onChange={(e) => setAddressline(e.target.value)}
            required
          />
        </div>

        <Separator />

        {/* Email */}
        <div className="space-y-2">
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Username */}
        <div className="space-y-2">
          <Label>Username</Label>
          <Input
            placeholder="choose a username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label>Password</Label>
          <Input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <Separator />

        {/* Country */}
        <div className="space-y-2">
          <Label>Country</Label>
          <Select
            value={countryCode}
            onValueChange={(val) => {
              setCountryCode(val);
              setStateCode("");
              setCity("");
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Country" />
            </SelectTrigger>
            <SelectContent className="max-h-72">
              {countries.map((c) => (
                <SelectItem key={c.isoCode} value={c.isoCode}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* State */}
        <div className="space-y-2">
          <Label>State</Label>
          <Select
            value={stateCode}
            onValueChange={(val) => {
              setStateCode(val);
              setCity("");
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select State" />
            </SelectTrigger>
            <SelectContent className="max-h-72">
              {states.map((s) => (
                <SelectItem key={s.isoCode} value={s.isoCode}>
                  {s.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* City */}
        <div className="space-y-2">
          <Label>City</Label>
          <Select value={city} onValueChange={(val) => setCity(val)}>
            <SelectTrigger>
              <SelectValue placeholder="Select City" />
            </SelectTrigger>
            <SelectContent className="max-h-72">
              {cities.map((c) => (
                <SelectItem key={c.name} value={c.name}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* GST */}
        <div className="space-y-2">
          <Label>GST (optional)</Label>
          <Input
            placeholder="22AAAAA0000A1Z5"
            value={gst}
            onChange={(e) => setGst(e.target.value)}
          />
        </div>

        <Button
          type="submit"
          className="w-full text-base"
          disabled={loading}
        >
          {loading ? "Creating account..." : "Register"}
        </Button>

      </form>
    </CardContent>
  </Card>
</div>

);
}
