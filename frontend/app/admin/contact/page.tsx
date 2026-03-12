"use client";

import { useEffect, useState } from "react";

export default function ContactPage() {

  const [messages, setMessages] = useState([]);

  useEffect(() => {

    const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

    fetch(`${STRAPI_URL}/api/contactuses`)
      .then(res => res.json())
      .then(data => setMessages(data.data));

  }, []);

  return (

    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Contact Messages
      </h1>

      {messages.map((m: any) => (

        <div key={m.id} className="border p-4 mb-3 rounded">

          <p><b>Name:</b> {m.name}</p>
          <p><b>Company:</b> {m.companyname}</p>
          <p><b>Mobile:</b> {m.mobileno}</p>
          <p><b>Message:</b> {m.message}</p>

        </div>

      ))}

    </div>

  );
}