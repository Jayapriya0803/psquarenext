"use client";

import { useState } from "react";

export default function ReviewPage() {
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!review) {
      alert("Please enter review");
      return;
    }

    console.log({
      rating,
      title,
      review,
      nickname: "P Square",
    });

    setSubmitted(true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black/40">

      {/* MAIN CARD */}
      <div className="bg-white w-[360px] rounded-2xl p-5 shadow-xl">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <button className="text-gray-400 text-xl">✕</button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-3 py-1 rounded-full"
          >
            ✓
          </button>
        </div>

        {/* TITLE */}
        <h2 className="text-lg font-semibold mb-4">
          Write a Review
        </h2>

        {/* APP INFO */}
        <div className="flex items-center gap-3 mb-4">
          <img
            src="/logo.png"
            className="w-12 h-12 rounded-xl"
          />
          <div>
            <h3 className="font-semibold">P Square Enterprises</h3>
            <p className="text-sm text-gray-400">
              The official app by P Suare Enterprises, the leading manufacturer
            </p>
          </div>
        </div>

        {/* STARS */}
        <div className="flex gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              className={`text-2xl cursor-pointer ${
                star <= rating ? "text-blue-500" : "text-gray-300"
              }`}
            >
              ★
            </span>
          ))}
        </div>

        {/* INPUTS */}
        <div className="bg-gray-100 rounded-xl p-3 mb-3">
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-transparent outline-none mb-2"
          />

          <hr />

          <textarea
            placeholder="Review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="w-full bg-transparent outline-none mt-2"
          />
        </div>

        {/* NICKNAME */}
        <p className="text-sm text-gray-400">
          Nickname: P Square
        </p>
      </div>

      {/* THANK YOU POPUP */}
      {submitted && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-2xl text-center w-[300px]">
            <h2 className="text-lg font-semibold mb-2">
              Thanks for your feedback
            </h2>

            <p className="text-gray-500 mb-4">
              You can also write a review.
            </p>

            <div className="flex justify-center gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className="text-orange-400 text-xl">
                  ★
                </span>
              ))}
            </div>

            <button
              onClick={() => setSubmitted(false)}
              className="w-full bg-gray-200 py-2 rounded-xl mb-2"
            >
              Write a Review
            </button>

            <button
              onClick={() => setSubmitted(false)}
              className="w-full bg-gray-300 py-2 rounded-xl"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}