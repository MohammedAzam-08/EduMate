import React from "react";

function CoursePricingCard({ title, payment, discount }) {
  const discountedPrice = payment - (payment * discount) / 100;

  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>

      <div className="text-3xl font-extrabold text-green-600 mb-2">
        ₹{discountedPrice.toLocaleString()}
      </div>

      {discount > 0 && (
        <div className="text-gray-500 line-through text-lg">
          ₹{payment.toLocaleString()}
        </div>
      )}

      <div className="text-red-600 text-sm font-medium mb-4">
        {discount}% off
      </div>

      <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold">
        Get Started
      </button>
    </div>
  );
}

export default CoursePricingCard;
