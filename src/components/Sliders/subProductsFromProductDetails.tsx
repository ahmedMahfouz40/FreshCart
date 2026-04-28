"use client";
import ProductCard from "@/components/ProductCard/ProductCard";
import { productType } from "@/types/product.type";
import { useId } from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function SubProductsSlider({
  products,
}: {
  products: productType[] | null;
}) {
  const id = useId().replace(/:/g, "-");
  return (
    <div className="relative ">
      <Swiper
        spaceBetween={30}
        slidesPerView={4}
        navigation={{
          nextEl: `.custom-next-${id}`,
          prevEl: `.custom-prev-${id}`,
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
        modules={[Navigation, Pagination]}
      >
        {products?.map((product) => (
          <SwiperSlide key={product._id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex absolute -top-13 sm:-top-15  -right-2 sm:right-0">
        <div className={`custom-prev-${id} cursor-pointer`}>
          <button className=" p-2 cursor-pointer flex! items-center justify-center text-2xl w-8 h-8 sm:w-10 sm:h-10 text-gray-800 hover:text-primary rounded-full bg-gray-100 mx-2 hover:bg-primary/15">
            <MdOutlineKeyboardArrowLeft />
          </button>
        </div>
        <div className={`custom-next-${id} cursor-pointer`}>
          <button className="p-2 cursor-pointer flex! items-center justify-center text-2xl w-8 h-8 sm:w-10 sm:h-10 text-gray-800 hover:text-primary rounded-full bg-gray-100 mx-2 hover:bg-primary/15">
            <MdOutlineKeyboardArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}
