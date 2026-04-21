import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa6";

const CardsHome = () => {
  return (
    <>
      <div className="grid md:grid-cols-2 gap-4 text-white my-20">
        <div className="relative space-y-3 overflow-hidden rounded-[16px] bg-linear-145 from-[#00BC7D] to-[#007A55] p-8">
          <span className="text-sm py-1 px-4 bg-white/25 rounded-3xl">
            🔥 Deal of the Day
          </span>
          <h3 className="font-bold leading-9 my-2">Fresh Organic Fruits</h3>
          <p className=" opacity-80">
            Get up to 40% off on selected organic fruits
          </p>
          <div>
            <span className="text-3xl font-bold">40% OFF </span>
            <span className=" text-sm opacity-75"> Use code: </span>
            <span>ORGANIC40</span>
          </div>
          <Link href="/products" className="bg-white text-primary p-3 rounded-3xl cursor-pointer hover:bg-gray-100 ">
            Shop Now <FaArrowRight className="inline" />
          </Link>
          <div className="absolute top-[-10%] inset-e-[-10%] w-32 h-32 rounded-full bg-white/10"></div>
          <div className="absolute bottom-[-10%] inset-s-[-10%] w-32 h-32 rounded-full bg-white/10"></div>
        </div>
        <div className="relative space-y-3 overflow-hidden rounded-[16px] bg-linear-145 from-[#FF8904] to-[#FF2056] p-8">
          <span className="text-sm py-1 px-4 bg-white/25 rounded-3xl">
            ✨ New Arrivals
          </span>
          <h3 className="font-bold leading-9 my-2">Exotic Vegetables</h3>
          <p className=" opacity-80">
            Discover our latest collection of premium vegetables
          </p>
          <div>
            <span className="text-3xl font-bold">25% OFF </span>
            <span className=" text-sm opacity-75"> Use code: </span>
            <span>FRESH25</span>
          </div>
          <button className="bg-white text-[#FF6900] p-3 rounded-3xl cursor-pointer hover:bg-gray-100">
            Explore Now <FaArrowRight className="inline" />
          </button>
          <div className="absolute top-[-10%] inset-e-[-10%] w-32 h-32 rounded-full bg-white/10"></div>
          <div className="absolute bottom-[-10%] inset-s-[-10%] w-32 h-32 rounded-full bg-white/10"></div>
        </div>
      </div>
    </>
  );
};

export default CardsHome;

