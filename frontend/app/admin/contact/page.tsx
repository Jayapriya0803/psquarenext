"use client";

import { useEffect,useState } from "react";

export default function ContactPage(){

const [messages,setMessages] = useState([]);

useEffect(()=>{

fetch("http://localhost:1337/api/contactuses")
.then(res=>res.json())
.then(data=>setMessages(data.data));

},[]);


return(

<div>

<h1 className="text-2xl font-bold mb-6">
Contact Messages
</h1>

{messages.map((m:any)=>(

<div key={m.id} className="border p-4 mb-3">

<p><b>Name:</b> {m.attributes?.name}</p>
<p><b>Email:</b> {m.attributes?.email}</p>
<p><b>Message:</b> {m.attributes?.message}</p>

</div>

))}

</div>

);

}