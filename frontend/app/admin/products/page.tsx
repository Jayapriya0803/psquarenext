"use client";

import { useState, useEffect } from "react";

export default function ProductsPage() {

  const [products, setProducts] = useState<any[]>([]);

  const [name,setName] = useState("");
  const [description,setDescription] = useState("");
  const [price,setPrice] = useState("");
  const [unit,setUnit] = useState("");
  const [attributes,setAttributes] = useState("");
  const [photo,setPhoto] = useState<File | null>(null);

  const STRAPI = process.env.NEXT_PUBLIC_STRAPI_URL;

  const loadProducts = async () => {
    try {
      const res = await fetch(`${STRAPI}/api/products?populate=photo`);
      const data = await res.json();
      setProducts(data.data || []);
    } catch (err) {
      console.error("Failed to load products");
    }
  };

  useEffect(()=>{
    loadProducts();
  },[]);

  const addProduct = async () => {

    if(!name || !price){
      alert("Enter product name and price");
      return;
    }

    try{

      let photoId = null;

      /* Upload Photo */
      if(photo){
        const formData = new FormData();
        formData.append("files",photo);

        const uploadRes = await fetch(`${STRAPI}/api/upload`,{
          method:"POST",
          body:formData
        });

        const uploadData = await uploadRes.json();
        photoId = uploadData[0].id;
      }

      /* Create Product */

      await fetch(`${STRAPI}/api/products`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          data:{
            name,
            description,
            price,
            unit,
            attributes,
            photo:photoId
          }
        })
      });

      setName("");
      setDescription("");
      setPrice("");
      setUnit("");
      setAttributes("");
      setPhoto(null);

      await loadProducts();

      alert("Product Added");

    }catch(err){
      console.error("Product add failed");
    }

  };

  return (
    <div>

      <h1 className="text-2xl font-bold mb-6">Products</h1>

      {/* Add Product */}

      <div className="space-y-3 mb-10">

        <input
        placeholder="Product name"
        value={name}
        className="border p-2 w-full"
        onChange={(e)=>setName(e.target.value)}
        />

        <textarea
        placeholder="Description"
        value={description}
        className="border p-2 w-full"
        onChange={(e)=>setDescription(e.target.value)}
        />

        <input
        placeholder="Price"
        value={price}
        className="border p-2 w-full"
        onChange={(e)=>setPrice(e.target.value)}
        />

        <input
        placeholder="Unit (kg, piece, box...)"
        value={unit}
        className="border p-2 w-full"
        onChange={(e)=>setUnit(e.target.value)}
        />

        <textarea
        placeholder="Other attributes (color, size etc)"
        value={attributes}
        className="border p-2 w-full"
        onChange={(e)=>setAttributes(e.target.value)}
        />

        <input
        type="file"
        onChange={(e)=>setPhoto(e.target.files?.[0] || null)}
        />

        <button
        onClick={addProduct}
        className="bg-black text-white px-4 py-2 rounded">
        Add Product
        </button>

      </div>

      {/* Product List */}

      <div className="space-y-4">

        {products.length === 0 && (
          <p>No products found</p>
        )}

        {products.map((p:any)=>{

          const image = p.photo?.url;

          return(
            <div key={p.id} className="border p-3 rounded flex gap-4">

              {image && (
                <img
                  src={`${STRAPI}${image}`}
                  className="w-20 h-20 object-cover rounded"
                />
              )}

              <div>
                <p className="font-semibold">{p.name}</p>
                <p className="text-sm text-gray-600">{p.description}</p>
                <p>₹{p.price} / {p.unit}</p>
                <p className="text-xs text-gray-500">{p.attributes}</p>
              </div>

            </div>
          );

        })}

      </div>

    </div>
  );
}