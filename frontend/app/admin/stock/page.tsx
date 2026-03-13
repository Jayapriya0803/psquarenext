"use client";

import { useEffect, useState } from "react";

export default function StockPage() {

const [stock,setStock] = useState<any[]>([]);

useEffect(()=>{

async function loadStock(){

const API = process.env.NEXT_PUBLIC_API_URL;

const prodRes = await fetch(`${API}/api/productions`);
const prodData = await prodRes.json();

const desRes = await fetch(`${API}/api/despatches`);
const desData = await desRes.json();

let result:any = {};

// Production
prodData.data.forEach((p:any)=>{

const item = p.attributes ? p.attributes : p;

if(!item.gsm) return;

const key = item.gsm + "-" + item.color + "-" + item.unit;

if(!result[key]){
result[key] = {
gsm:item.gsm,
color:item.color,
unit:item.unit,
production:0,
despatch:0
};
}

result[key].production += item.quantity || 0;

});


// Despatch
desData.data.forEach((d:any)=>{

const item = d.attributes ? d.attributes : d;

if(!item.gsm) return;

const key = item.gsm + "-" + item.color + "-" + item.unit;

if(!result[key]){
result[key] = {
gsm:item.gsm,
color:item.color,
unit:item.unit,
production:0,
despatch:0
};
}

result[key].despatch += item.quantity || 0;

});

const finalStock = Object.values(result).map((i:any)=>({
...i,
balance:i.production - i.despatch
}));

setStock(finalStock);

}

loadStock();

},[]);

return(

<div className="p-8">

<h1 className="text-2xl font-bold mb-6">Stock Details</h1>

<table className="border w-full">

<thead className="bg-gray-100">

<tr>
<th className="p-2">GSM</th>
<th className="p-2">Color</th>
<th className="p-2">Unit</th>
<th className="p-2">Production</th>
<th className="p-2">Despatch</th>
<th className="p-2">Balance</th>
</tr>

</thead>

<tbody>

{stock.map((s:any,i)=>(
<tr key={i} className="border-t">

<td className="p-2">{s.gsm}</td>
<td className="p-2">{s.color}</td>
<td className="p-2">{s.unit}</td>
<td className="p-2">{s.production}</td>
<td className="p-2">{s.despatch}</td>
<td className="p-2 font-semibold">{s.balance}</td>

</tr>
))}

</tbody>

</table>

</div>

);

}