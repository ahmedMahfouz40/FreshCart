import Container from "@/app/_components/Container/Container";
import ProductCard from "@/app/_components/ProductCard/ProductCard";
import { getAllProducts } from "@/services/products";
import React from "react";
import { FaBoxOpen } from "react-icons/fa";

const page = async () => {
  const products = await getAllProducts();
  return (
    <div>
      <div className="text-white bg-linear-to-br   from-[#16A34A] via-[#22C55E] to-[#4ADE80] w-full h-50 py-14 px-4">
        <Container>
          <div className="space-y-5">
            <p className="text-sm leading-5 ">
              <span className="opacity-70">Home /</span>
              <span> All Products</span>
            </p>
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl  bg-white/20">
                <FaBoxOpen />
              </div>
              <div>
                <h1 className="text-4xl leading-10 font-bold ">All Products</h1>
                <p className="opacity-80">
                  Explore our complete product collection
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <Container>
        <p className="text-sm leading-5 text-[#6A7282] my-10">
          Showing {products?.length} products
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5  gap-4">
          {products?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default page;
