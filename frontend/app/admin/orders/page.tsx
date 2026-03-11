"use client";

import { useEffect, useState } from "react";

export default function OrdersPage(){

const [orders,setOrders] = useState([]);

const STRAPI = "http://localhost:1337";

useEffect(()=>{

fetch(`${STRAPI}/api/orders?populate=*`)
.then(res=>res.json())
.then(data=>setOrders(data.data));

},[]);


const updateStatus = async (id:number,status:string)=>{

await fetch(`${STRAPI}/api/orders/${id}`,{
method:"PUT",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
data:{ orderStatus:status }
})
});

alert("Status Updated");

};


return(

<div>

<h1 className="text-2xl font-bold mb-6">Orders</h1>

<table className="w-full border">

<thead className="bg-gray-200">
<tr>
<th>ID</th>
<th>Total</th>
<th>Status</th>
<th>Update</th>
</tr>
</thead>

<tbody>

{orders.map((o:any)=>(
<tr key={o.id} className="border">

<td className="p-2">{o.id}</td>

<td className="p-2">₹{o.attributes?.total}</td>

<td className="p-2">{o.attributes?.orderStatus}</td>

<td className="p-2">

<select
onChange={(e)=>updateStatus(o.id,e.target.value)}
className="border p-1"
>

<option>Pending</option>
<option>Processing</option>
<option>Shipped</option>
<option>Delivered</option>

</select>

</td>

</tr>
))}

</tbody>

</table>

</div>

);

}