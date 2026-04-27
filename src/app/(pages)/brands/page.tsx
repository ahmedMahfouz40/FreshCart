import Container from "@/components/Container/Container";
import Image from "next/image";
import React from "react";
import { FaArrowRight, FaTags } from "react-icons/fa6";
import { getAllBrands } from "@/actions/brands.actions";
import Link from "next/link";
import Header from "@/components/Header/Header";
const page = async () => {
  const brands = await getAllBrands();
  console.log("brands", brands);

  return (
    <div>
      <Header
        icon={<FaTags />}
        title="Top Brands"
        desc="Shop from your favorite brands"
        style={[
          "text-white",
          "bg-linear-to-br",
          "from-[#7F22FE]",
          "via-[#8E51FF]",
          "to-[#C27AFF]",
        ]}
      />

      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4 py-4">
          {brands.data.map((brand) => (
            <Link
              href={`/products?brand=${brand._id}`}
              key={brand._id}
              className="p-5  text-center group space-y-4 shadow hover:shadow-xl transition-all duration-500 rounded-2xl"
            >
              <div className="relative bg-[#F9FAFB] p-4 rounded-lg shadow">
                <Image
                  src={brand.image}
                  alt="image"
                  width={300}
                  height={300}
                  className="w-full group-hover:scale-[1.2] transition-all duration-500 rounded"
                />
              </div>
              <h3 className="font-semibold text-sm leading-5 group-hover:text-purple-600 text-heading">
                {brand.name}
              </h3>
              <span className="text-xs text-violet-600 flex opacity-0 group-hover:opacity-100 transition-all duration-500 items-center gap-1 justify-center">
                View Products
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
