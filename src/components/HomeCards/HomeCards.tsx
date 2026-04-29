"use client";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import { motion } from "framer-motion";

const HomeCards = () => {
  return (
    <div className="grid md:grid-cols-2 gap-4 overflow-x-hidden text-white my-20">
      {/* Left card */}
      <motion.div
        initial={{ opacity: 0, x: -54 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
        viewport={{ once: false, amount: 0.2 }}
        className="relative space-y-3 overflow-hidden rounded-2xl bg-linear-145 from-[#00BC7D] to-[#007A55] p-8"
      >
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
        <Link
          href="/products"
          className="bg-white text-primary p-4  inline-block rounded-3xl cursor-pointer hover:bg-gray-100 hover:scale-[1.05] transition-all"
        >
          Shop Now <FaArrowRight className="inline" />
        </Link>
        <div className="absolute top-[-10%] inset-e-[-10%] w-32 h-32 rounded-full bg-white/10"></div>
        <div className="absolute bottom-[-10%] inset-s-[-10%] w-32 h-32 rounded-full bg-white/10"></div>
      </motion.div>

      {/* Right card */}
      <motion.div
        initial={{ opacity: 0, x: 54 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
        viewport={{ once: false, amount: 0.2 }}
        className="relative space-y-3 overflow-hidden rounded-2xl bg-linear-145 from-[#FF8904] to-[#FF2056] p-8"
      >
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
        <button className="bg-white text-[#FF6900] p-4 rounded-3xl cursor-pointer hover:bg-gray-100 hover:scale-[1.05] transition-all">
          Explore Now <FaArrowRight className="inline" />
        </button>
        <div className="absolute top-[-10%] inset-e-[-10%] w-32 h-32 rounded-full bg-white/10"></div>
        <div className="absolute bottom-[-10%] inset-s-[-10%] w-32 h-32 rounded-full bg-white/10"></div>
      </motion.div>
    </div>
  );
};
export default HomeCards;
