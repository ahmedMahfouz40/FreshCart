import Container from "@/app/_components/Container/Container";
import { getAllCategories } from "@/services/categories";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowRight, FaLayerGroup } from "react-icons/fa6";

const page = async () => {
  const categories = await getAllCategories();
  console.log(categories, "categories");

  return (
    <div>
      <div className="text-white bg-linear-to-br   from-[#16A34A] via-[#22C55E] to-[#4ADE80] w-full h-50 py-14 px-4">
        <Container>
          <div className="space-y-5">
            <p className="text-sm leading-5 ">
              <Link href={"/"} className="opacity-70">
                Home /
              </Link>
              <span> Categories</span>
            </p>
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl  bg-white/20">
                <FaLayerGroup />
              </div>
              <div>
                <h1 className="text-4xl leading-10 font-bold ">
                  All Categories
                </h1>
                <p className="opacity-80">
                  Browse our wide range of product categories
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4 py-4">
          {categories?.map((category) => (
            <Link
              href={`category/${category._id}`}
              key={category._id}
              className="p-5  text-center group h-full flex flex-col space-y-4 shadow hover:shadow-xl transition-all duration-500 rounded-2xl"
            >
              <div className="relative bg-[#F9FAFB] p-4 rounded-lg shadow aspect-square overflow-hidden">
                <Image
                  src={category.image}
                  alt="image"
                  fill
                  className="object-contain group-hover:scale-[1.2] transition-all duration-500 rounded p-2"
                />
              </div>
              <h3 className="font-semibold flex-1 leading-5 group-hover:text-primary-600 text-heading">
                {category.name}
              </h3>
              <span className="text-sm text-primary-600 flex opacity-0 group-hover:opacity-100 transition-all duration-500 items-center gap-1 justify-center">
                View Subcategories
                <FaArrowRight className="text-[10px]" />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default page;
