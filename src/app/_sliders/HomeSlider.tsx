"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import imageSlider1 from "@/images/Home.png";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import Link from "next/link";

interface Slider {
  id: number;
  img: string;
  title: string;
  content: string;
  btnColor: string;
  btnText1: string;
  btnText2: string;
  href1: string;
  href2: string;
}

const imgs: Slider[] = [
  {
    id: 1,
    img: imageSlider1.src,
    title: "Fresh Products Delivered to your Door",
    content: "Get 20% off your first order",
    btnColor: "text-primary",
    btnText1: "Shop Now",
    btnText2: "View Deals",
    href1: "/products",
    href2: "/deals",
  },
  {
    id: 3,
    img: imageSlider1.src,
    title: "Premium Quality Guaranteed",
    content: "Fresh from farm to your table",
    btnColor: "text-blue-500",
    btnText1: "Shop Now",
    btnText2: "Learn More",
    href1: "/products",
    href2: "/about",
  },
  {
    id: 2,
    img: imageSlider1.src,
    title: "Fast & Free Delivery",
    content: "Same day delivery available",
    btnColor: "text-purple-500",
    btnText1: "Order Now",
    btnText2: "Delivery Info",
    href1: "/cart",
    href2: "/delivery",
  },
];

export default function HomeSlider() {
  return (
    <div className="w-full ">
      <div className="w-full relative">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          pagination={{
            clickable: true,
            renderBullet(index, className) {
              return `<span class='${className} bg-[#ffffff80]! w-3! h-3!'></span>`;
            },
            bulletActiveClass:
              "bg-white! w-[34px]! h-[12px]! opacity-100! rounded-xl! transition-all! duration-500! hover:scale-105!",
          }}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          className="mySwiper  overflow-hidden shadow-md "
        >
          {imgs.map((slide, id) => (
            <>
              <SwiperSlide key={id}>
                <div className="relative">
                  <Image
                    src={slide.img}
                    alt="Featured Slider"
                    width={500}
                    height={500}
                    className="w-full h-100 object-cover"
                  />
                  <div>
                    <div className="absolute inset-0 bg-linear-to-r from-green-600/95 to-green-400/60">
                      <motion.div
                        initial={{ opacity: 0, y: 54 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: false, amount: 0.2 }}
                        className=" h-full w-[80%]   flex flex-col justify-center mx-auto"
                      >
                        <h3 className="text-white text-3xl font-bold mb-4 max-w-96">
                          {slide.title}
                        </h3>
                        <p className="text-white font-normal">
                          {slide.content}
                        </p>
                        <div className="flex gap-2.5 mt-4">
                          <Link
                            href={slide.href1}
                            className={`${slide.btnColor} font-semibold bg-white py-2 px-6 rounded-lg hover:scale-105 transition-transform`}
                          >
                            {slide.btnText1}
                          </Link>
                          <Link
                            href={slide.href2}
                            className="text-white border-2 font-semibold border-white/50 py-2 px-6 rounded-lg hover:scale-105 transition-transform"
                          >
                            {slide.btnText2}
                          </Link>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </>
          ))}
        </Swiper>
        {/* Custom Buttons Navigation*/}
        <button className="custom-prev hidden! sm:flex! absolute left-4 top-1/2 -translate-y-1/2 z-10">
          <FaChevronLeft className="hover:scale-110 transition-transform" />
        </button>

        <button className="custom-next hidden! sm:flex! absolute right-4 top-1/2 -translate-y-1/2 z-10">
          <FaChevronRight className="hover:scale-110 transition-transform" />
        </button>
      </div>
    </div>
  );
}
