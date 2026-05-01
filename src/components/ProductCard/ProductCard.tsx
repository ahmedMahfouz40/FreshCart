import { productType } from "@/types/product.type";
import Image from "next/image";
import { FaEye } from "react-icons/fa6";
import { FiRefreshCw } from "react-icons/fi";
import Link from "next/link";
import Rating from "../Rating/Rating";
import AddToCart from "../Buttons/AddToCartFromCart";
import AddToWishlist from "../Buttons/AddToWishlist";
import React from "react";
import CardAnimationWrapper from "./CardAnimationWrapper";

const ProductCard = ({ product }: { product: productType }) => {
  const rating: number = product.ratingsAverage;

  const percentageDiscount: number | null = product.priceAfterDiscount
    ? Math.round(
        ((product.price - product.priceAfterDiscount) / product.price) * 100,
      )
    : null;

  return (
    <CardAnimationWrapper>
      <div className="relative border  rounded-2xl border-[#E5E7EB] overflow-hidden p-3 hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
        {/* Image  */}
        <Link href={`/products/${product._id}`}>
          <Image
            src={product.imageCover}
            width={100}
            height={100}
            className="w-full"
            alt={product.title}
          />
        </Link>
        {/* Title & Category */}
        <p className="text-xs text-muted-foreground">{product.category.name}</p>
        <Link href={`/products/${product._id}`} className="w-full">
          <h2 className="text-xl my-1 text-gray-800 line-clamp-1">
            {product.title}
          </h2>
        </Link>

        {/* Rating */}
        <div className="flex gap-1">
          <Rating rating={rating} />
          <div className="text-xs hidden sm:block text-muted-foreground leading-4">
            ({product.ratingsQuantity || 0})
          </div>
        </div>
        <div className="flex justify-between items-center">
          {/* Price  */}
          {product.priceAfterDiscount ? (
            <>
              <div className="flex gap-2  items-center flex-wrap">
                <h3 className="font-bold text-[18px] flex items-center flex-wrap w-full gap-1  text-primary-600 leading-5">
                  {product.priceAfterDiscount} <span>EGP</span>
                </h3>
                <p className="text-xs text-muted-foreground line-through">
                  {product.price} EGP
                </p>
              </div>
            </>
          ) : (
            <h3 className="font-bold text-[18px] leading-5">
              {product.price} EGP
            </h3>
          )}
          <div>
            <AddToCart productId={product._id} />
          </div>
        </div>

        {/* Options absolute */}
        {percentageDiscount && (
          <div className="absolute top-3 rounded inset-s-3 flex items-center justify-center text-xs bg-error-400 w-11.75 h-6  text-white">
            <div> -{percentageDiscount} % </div>
          </div>
        )}
        <div className="absolute top-10 inset-e-1.5 space-y-3 text-lg  text-[#4A5565]">
          <AddToWishlist productId={product._id} />
          <div className=" w-8 h-8 border rounded-full flex items-center justify-center shadow-md hover:text-primary-600 cursor-pointer">
            <FiRefreshCw />
          </div>
          <Link
            href={`/products/${product._id}`}
            className=" w-8 h-8 border rounded-full flex items-center justify-center shadow-md hover:text-primary-600"
          >
            <FaEye />
          </Link>
        </div>
      </div>
    </CardAnimationWrapper>
  );
};

export default React.memo(ProductCard);
