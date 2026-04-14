
"use client"
import { useState } from "react";

const Price_Quantity = ({ quantity, price }: { quantity: number; price: number }) => {
  const [count, setCount] = useState(1);

  const increment = () => {
    if (count < quantity) setCount((prev) => prev + 1);
  };

  const decrement = () => {
    if (count > 1) setCount((prev) => prev - 1);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (val >= 1 && val <= quantity) setCount(val);
  };

  return (
    <>
      {/* Quantity */}
      <div>
        <span className="block text-sm text-[#364153]">Quantity</span>
        <div className="flex gap-2 items-center my-2">
          <div className="inline-flex px-8 py-2 gap-6 rounded items-center border">
            <button onClick={decrement} className="text-2xl cursor-pointer">
              -
            </button>
            <input
              type="number"
              className="w-12 ms-3"
              value={count}
              onChange={handleInput}
              max={quantity}
              min={1}
            />
            <button onClick={increment} className="text-2xl cursor-pointer">
              +
            </button>
          </div>
          <p className="text-sm text-muted-foreground">{quantity} available</p>
        </div>
        <div className="flex justify-between bg-gray-50 rounded-2xl p-4 my-4">
          <span className="text-[#4A5565]">Total Price:</span>
          <span className="font-bold text-2xl text-primary-600">
            {price * count} EGP
          </span>
        </div>
      </div>
    </>
  );
};

export default Price_Quantity;