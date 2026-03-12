"use client";

import { useState } from "react";

export default function DespatchPage() {

const [form,setForm] = useState({
descrip:"",
gsm:"GSM40",
color:"blue",
date:"",
quantity:"",
unit:"pairs"
});

const handleChange = (e:any)=>{
setForm({
...form,
[e.target.name]:e.target.value
});
};

const handleSubmit = async (e:any)=>{
e.preventDefault();
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
await fetch(`${STRAPI_URL}/api/despatches`,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
data:{
descrip:form.descrip,
gsm:form.gsm,
color:form.color,
date:form.date,
quantity:Number(form.quantity),
unit:form.unit
}
})
});

alert("Despatch Added Successfully");
};

return(

<div className="p-8 flex justify-center">

<div className="w-full max-w-xl bg-white shadow-md rounded-lg p-6">

<h1 className="text-2xl font-bold mb-6">
Daily Despatch Entry
</h1>

<form onSubmit={handleSubmit} className="space-y-4">

<div>
<label className="block text-sm font-medium mb-1">
Description
</label>
<input
name="descrip"
onChange={handleChange}
className="w-full border rounded-md p-2"
/>
</div>

<div className="grid grid-cols-2 gap-4">

<div>
<label className="block text-sm font-medium mb-1">
GSM
</label>
<select
name="gsm"
onChange={handleChange}
className="w-full border rounded-md p-2"
>
<option value="GSM40">40 GSM</option>
<option value="GSM50">50 GSM</option>
<option value="GSM60">60 GSM</option>
<option value="GSM70">70 GSM</option>
<option value="GSM80">80 GSM</option>
<option value="COTTONWASTE">Waste Cloth</option>
</select>
</div>

<div>
<label className="block text-sm font-medium mb-1">
Color
</label>
<select
name="color"
onChange={handleChange}
className="w-full border rounded-md p-2"
>
<option value="blue">Blue</option>
<option value="grey">Grey</option>
<option value="greenishblue">Greenish Blue</option>
<option value="white">White</option>
</select>
</div>

</div>

<div className="grid grid-cols-2 gap-4">

<div>
<label className="block text-sm font-medium mb-1">
Date
</label>
<input
type="date"
name="date"
onChange={handleChange}
className="w-full border rounded-md p-2"
/>
</div>

<div>
<label className="block text-sm font-medium mb-1">
Quantity
</label>
<input
type="number"
name="quantity"
onChange={handleChange}
className="w-full border rounded-md p-2"
/>
</div>

</div>

<div>
<label className="block text-sm font-medium mb-1">
Unit
</label>
<select
name="unit"
onChange={handleChange}
className="w-full border rounded-md p-2"
>
<option value="pairs">Pairs</option>
<option value="boxes">Boxes</option>
<option value="kg">KG</option>
<option value="nos">Nos</option>
</select>
</div>

<button
type="submit"
className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800"
>
Add Despatch
</button>

</form>

</div>

</div>

);

}