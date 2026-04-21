"use client";

import { useState, useRef } from "react";
import Image from "next/image";

export default function ProductDetailsSlider({ images }: { images: string[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const mainRef = useRef<HTMLDivElement>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const isProgrammatic = useRef(false);

  const scrollMainTo = (index: number) => {
    if (!mainRef.current) return;
    const width = mainRef.current.clientWidth;
    isProgrammatic.current = true;

    mainRef.current.scrollTo({
      left: width * index,
      behavior: "smooth",
    });

    setTimeout(() => {
      isProgrammatic.current = false;
    }, 350);
  };

  const scrollThumbIntoView = (index: number) => {
    if (!thumbsRef.current) return;
    const thumb = thumbsRef.current.children[index] as HTMLElement;
    if (!thumb) return;

    const container = thumbsRef.current;
    const thumbLeft = thumb.offsetLeft;
    const thumbWidth = thumb.offsetWidth;
    const containerWidth = container.offsetWidth;

    // manually center the thumb without triggering page scroll
    container.scrollTo({
      left: thumbLeft - containerWidth / 2 + thumbWidth / 2,
      behavior: "smooth",
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
    <div className="flex flex-col gap-3 w-full max-w-full select-none overflow-hidden">
      {/* ── Main Slider ── */}
      <div
        ref={mainRef}
        onScroll={handleMainScroll}
        className="flex overflow-x-auto snap-x snap-mandatory"
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
              className="object-contain"
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      {/* ── Thumbnails ── */}
      <div
        ref={thumbsRef}
        className="flex gap-1.5 overflow-x-auto pb-1 px-2"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => handleThumbClick(i)}
            className={`relative shrink-0 aspect-square cursor-pointer transition-all duration-100
              w-1/3 sm:w-1/5 lg:w-1/3
              ${
                activeIndex === i
                  ? "border-4 border-blue-500 scale-105 shadow-md opacity-100"
                  : "border-4 border-transparent opacity-90 hover:border-blue-500 hover:opacity-100"
              }
            `}
          >
            <Image
              src={src}
              alt={`Thumbnail ${i + 1}`}
              fill
              className="object-cover rounded"
            />
          </button>
        ))}
      </div>
    </div>
  );
}