"use client";

const categories = [
  "Cotton Gloves",
  "PVC Dotted",
  "Latex Gloves",
  "Industrial",
  "Safety",
];

export default function CategoryBar() {
  return (
    <div className="overflow-x-auto whitespace-nowrap bg-white px-3 py-3 border-b">
      {categories.map((cat) => (
        <button
          key={cat}
          className="inline-block mr-3 px-4 py-2 bg-gray-100 rounded-full text-sm hover:bg-green-100"
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
