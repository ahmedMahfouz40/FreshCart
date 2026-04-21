"use client";

import Container from "@/app/_components/Container/Container";
import Image from "next/image";
import Link from "next/link";
import {
  FaCartShopping,
  FaCheck,
  FaHeart,
  FaSpinner,
  FaTrash,
} from "react-icons/fa6";
import Loading from "./loading";
import EmptyWishlist from "@/app/_components/EmptyWishlist/EmptyWishlist";
import { toast } from "sonner";
import { useAddToCart } from "@/app/_hooks/useAddToCart";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/_hooks/reduxHooks";
import { fetchUserWishlist } from "@/app/_redux/slices/wishlistSlice";
import { useDeleteFromWishlist } from "@/app/_hooks/useDeleteFromWishlist";

const Wishlist = () => {
  const {
    handleAddToCart,
    isLoading: isAddingTocartId,
    isSuccess: isAddedToCart,
  } = useAddToCart();

  const {
    wishlistProducts: wishlist,
    isLoading,
    isError,
  } = useAppSelector((state) => state.wishlistReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserWishlist());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error("Error 404 cannot get your wishlist ", {
        position: "top-center",
        richColors: true,
      });
    }
  }, [isError]);
  const { handleDeleteFromWishlist, isLoading: isDeleting } =
    useDeleteFromWishlist();
  const { cartProducts } = useAppSelector((state) => state.cartReducer);

  if (isLoading) return <Loading />;
  if (wishlist && wishlist.length == 0) return <EmptyWishlist />;

  return (
    <div>
      <Container>
        {/* Header */}
        <div className="space-y-6 my-10">
          <p className="text-sm leading-5 ">
            <Link
              href={"/"}
              className="opacity-70 hover:text-primary hover:opacity-100"
            >
              Home /
            </Link>
            <span> Wishlist</span>
          </p>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl text-xl bg-[#FEF2F2] text-[#FB2C36]">
              <FaHeart />
            </div>
            <div>
              <h1 className="text-2xl text-heading font-bold leading-9">
                My Wishlist
              </h1>
              <p className="leading-5 text-sm text-[#6A7282]">
                {wishlist?.length || 0} items saved
              </p>
            </div>
          </div>
        </div>
        {/* Layout */}
        <div className="divide-y divide-gray-100 bg-white shadow  px-4 py-8 rounded">
          {/* Table Head */}
          <div className="hidden md:grid md:grid-cols-12 py-4 px-6 gap-2 bg-gray-50 rounded-t-2xl border border-[#F3F4F6] text-sm text-[#6A7282]">
            <div className="col-span-6 ">
              <span>product</span>
            </div>
            <div className="col-span-2 text-center ">
              <span>price</span>
            </div>
            <div className="col-span-2 text-center ">
              <span>status</span>
            </div>
            <div className="col-span-2 text-center ">
              <span>action</span>
            </div>
          </div>
          {/*  Row */}
          {wishlist?.map((item) => {
            const isInCart = cartProducts?.some(
              (prod) => String(prod.product._id) == item._id,
            );
            return (
              <div
                key={item._id}
                className="grid grid-cols-12 gap-2 py-4 px-6 items-center"
              >
                <div className="col-span-12 md:col-span-6">
                  <div className="flex gap-4 items-center">
                    <div className=" relative w-20 h-20 rounded-xl border border-[#F3F4F6] overflow-hidden">
                      <Image
                        fill
                        src={item.imageCover}
                        alt={item.title}
                        className="w-full"
                      />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-heading">{item.title}</h3>
                      <p className="text-sm text-[#99A1AF] leading-5">
                        {item.category.name}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-2 md:text-center text-heading font-semibold">
                  <div className="flex items-center md:block gap-2">
                    <span className="bg-gray-50 text-sm md:hidden text-[#6A7282]">
                      price:
                    </span>
                    <div>
                      {item.priceAfterDiscount ? (
                        <>
                          <p>{item.priceAfterDiscount} EGP</p>
                          <p className="text-gray-500 font-light text-sm line-through">
                            {item.price} EGP
                          </p>
                        </>
                      ) : (
                        <p>{item.price} EGP</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-2 md:text-center">
                  <div className="flex items-center md:block  gap-2">
                    <span className="bg-gray-50 text-sm md:hidden text-[#6A7282]">
                      status:
                    </span>
                    {item.quantity > 0 && (
                      <div className="inline-flex items-center text-sm leading-5 gap-2 bg-green-50 px-3 py-1.5 rounded-full">
                        <span
                          className={`w-2 h-2 rounded-full  bg-green-500 ${isInCart && "hidden"}`}
                        ></span>
                        {isInCart && (
                          <FaCartShopping className="text-primary " />
                        )}
                        <span className="text-green-600 font-semibold ">
                          {isInCart ? "In Cart" : " In Stock"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-span-12 md:col-span-2 md:text-center">
                  <div className="flex items-center justify-center gap-2">
                    {isInCart ? (
                      <Link
                        className="  flex-1 md:flex-none inline-flex  items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all"
                        href="/cart"
                      >
                        <FaCheck className="text-primary text-xs" />

                        <span className="md:hidden xl:inline">View Cart</span>
                      </Link>
                    ) : (
                      <>
                        <button
                          disabled={isAddingTocartId == item._id}
                          onClick={() => handleAddToCart(item._id)}
                          className=" bg-primary flex-1 justify-center disabled:opacity-50  text-white flex items-center gap-2 py-2.5 px-2 rounded-lg cursor-pointer hover:bg-primary-700 transition-colors duration-300"
                        >
                          {isAddingTocartId == item._id ? (
                            <FaSpinner className="animate-spin " />
                          ) : isAddedToCart == item._id ? (
                            <FaCheck />
                          ) : (
                            <FaCartShopping />
                          )}

                          <span className="  md:hidden xl:inline">
                            {isAddingTocartId == item._id
                              ? "Adding "
                              : "Add To cart"}
                          </span>
                        </button>
                      </>
                    )}
                    <button
                      disabled={isDeleting == item._id}
                      onClick={() => handleDeleteFromWishlist(item._id)}
                      className="border rounded-lg h-11 disabled:cursor-not-allowed disabled:opacity-60 w-11  border-[#E5E7EB] flex items-center justify-center bg-white text-[#99A1AF] hover:bg-red-500  hover:text-white cursor-pointer transition-colors duration-300"
                    >
                      {isDeleting == item._id ? (
                        <FaSpinner className="animate-spin" />
                      ) : (
                        <FaTrash />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* =================== */}
        <div className="my-8 flex items-center justify-between">
          <Link
            className="text-gray-500 hover:text-primary-600 text-sm font-medium transition-colors"
            href="/products"
          >
            ← Continue Shopping
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default Wishlist;
