"use client";

import { useState, useRef } from "react";
import Image from "next/image";

export default function ProductDetailsSlider({ images }: { images: string[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const mainRef = useRef<HTMLDivElement>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const isProgrammatic = useRef(false);

  // Scroll main slider
  const scrollMainTo = (index: number) => {
    if (!mainRef.current) return;

    const width = mainRef.current.clientWidth;
    isProgrammatic.current = true;

    mainRef.current.scrollTo({
      left: width * index,
      behavior: "smooth",
    });

    // release lock after animation
    setTimeout(() => {
      isProgrammatic.current = false;
    }, 350);
  };

  const scrollThumbIntoView = (index: number) => {
    if (!thumbsRef.current) return;

    const thumb = thumbsRef.current.children[index] as HTMLElement;
    thumb?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  const handleThumbClick = (index: number) => {
    if (index === activeIndex) return;

    setActiveIndex(index);
    scrollMainTo(index);
    scrollThumbIntoView(index);
  };

  const handleMainScroll = () => {
    if (!mainRef.current || isProgrammatic.current) return;

    const width = mainRef.current.clientWidth;
    const scrollLeft = mainRef.current.scrollLeft;

    const newIndex = Math.round(scrollLeft / width);

    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
      scrollThumbIntoView(newIndex);
    }
  };

  return (
    <div className="container flex flex-col gap-3 w-full max-w-full select-none">
      {/* ── Main Slider ── */}
      <div className="relative">
        <div
          ref={mainRef}
          onScroll={handleMainScroll}
          className="flex overflow-x-auto snap-x snap-mandatory   scroll-smooth"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {images?.map((src, i) => (
            <div
              key={i}
              className="relative shrink-0 w-full aspect-square snap-start snap-always"
            >
              <Image
                src={src}
                alt={`Product image ${i + 1}`}
                fill
                className="object-contain  md:w-1/2! mx-auto lg:w-full! "
                priority={i === 0}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Thumbnails ── */}
      <div
        ref={thumbsRef}
        className="flex gap-1.5 justify-center overflow-x-hidden pb-1  px-2"
      >
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => handleThumbClick(i)}
            className={`relative shrink-0 aspect-square opacity-100 hover:border-4 hover:border-blue-500 cursor-pointer transition-all duration-100
        ${
          activeIndex === i
            ? "border-4 border-blue-500 scale-105 shadow-md opacity-100"
            : "border-transparent opacity-50"
        }
        w-1/3 sm:w-1/5 lg:w-1/3
      `}
          >
            <Image
              src={src}
              alt={`Thumbnail ${i + 1}`}
              fill
              className="object-cover rounded "
            />
          </button>
        ))}
      </div>
    </div>
  );
}
