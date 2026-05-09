import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import Image from "next/image";
import { getAllCategories } from "@/actions/categories.action";
import Link from "next/link";
const ShopByCategories = async () => {
  const categories = await getAllCategories();

  return (
    <div className="my-5">
      {/* Header  */}
      <div className="flex flex-col sm:flex-row  sm:justify-between gap-5  mb-5">
        <h2 className="font-bold text-3xl border-s-5 rounded ps-3 border-primary-600">
          Shop By <span className="text-primary-600 ">Category</span>
        </h2>
        <Link
          href={"/categories"}
          className="text-primary-600 leading-6 self-end sm:self-stretch"
        >
          View All Categories <FaArrowRight className="inline" />
        </Link>
      </div>
      {/* Content */}
      <div className="grid grid-cols-2 md:grid-cols-5 xl:grid-cols-6 gap-5 p-4 ">
        {categories?.map((prod) => (
          <Link
            href={`products/?subCategory=${prod._id}`}
            key={prod._id}
            className="flex flex-col items-center gap-2 shadow rounded-xl hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300"
          >
            <Image
              src={prod.image}
              width={300}
              className=" h-20 w-20 rounded-full "
              height={300}
              alt={prod.name}
            />
            <h3 className="text-xs text-[#364153]">{prod.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ShopByCategories;
