"use client";
import Image from "next/image";
import { FaCheck, FaSpinner, FaTrash } from "react-icons/fa6";
import { useState } from "react";
import { updateCartProduct } from "@/actions/cart.actions";
import { toast } from "sonner";
import CardEmpty from "../CardEmpty/CardEmpty";
import Link from "next/link";
import CartItemSkeleton from "@/components/skeletons/CartItemSkeleton";
import { useDeleteFromCart } from "@/hooks/useDeleteFromCart";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { fetchUserCart, updateCartQuantity } from "@/redux/slices/cartSlice";

const ShoppingCard = () => {
  const [LoadingUpdateId, setLoadingupdateId] = useState<string | null>(null);
  const { isLoading: isDeleting, handleDeleteFromCart } = useDeleteFromCart();

  const dispatch = useAppDispatch();
  const cartReducer = useAppSelector((state) => state.cartReducer);

  if (cartReducer.isLoading) {
    return Array.from({ length: 3 }).map((_, i) => (
      <CartItemSkeleton key={i} />
    ));
  }
  if (cartReducer.isError) {
    return <CardEmpty />;
  }
  if (cartReducer.isSuccess && cartReducer.cartProducts.length === 0) {
    return <CardEmpty />;
  }
  if (!cartReducer.isSuccess) {
    return Array.from({ length: 3 }).map((_, i) => (
      <CartItemSkeleton key={i} />
    ));
  }

  async function handleUpdateProduct(id: string, count: number) {
    setLoadingupdateId(id);
    try {
      const res = await updateCartProduct(id, count);
      if (res.status == "success") {
        toast.success(res.message, {
          position: "top-center",
          richColors: true,
        });

        dispatch(
          updateCartQuantity({
            productId: id,
            quantity: count,
          }),
        );
      } else {
        dispatch(fetchUserCart());
      }
      if (res.statusMsg == "fail") {
        toast.error(res.message, { position: "top-center", richColors: true });
      }
    } catch (error) {
      console.log("error updating cart", error);
      toast.error("server error ", {
        position: "top-center",
        richColors: true,
      });
    } finally {
      setLoadingupdateId(null);
    }
  }

  return (
    <>
      {cartReducer.isLoading ? (
        Array.from({ length: 3 }).map((_, i) => <CartItemSkeleton key={i} />)
      ) : cartReducer.isError || cartReducer.cartProducts.length === 0 ? (
        <>
          <CardEmpty />
        </>
      ) : (
        <>
          {cartReducer.cartProducts?.map((cart) => {
            return (
              <div
                key={cart.product._id}
                className={`flex flex-col sm:flex-row gap-3 sm:gap-4 relative
                ${isDeleting === cart.product._id || LoadingUpdateId == cart.product._id ? "cursor-wait opacity-50 bg-gray-200" : "bg-white"}
                shadow border border-gray-100 rounded-2xl my-4 p-4`}
              >
                {(isDeleting === cart.product._id ||
                  LoadingUpdateId === cart.product._id) && (
                  <div className="flex  items-center justify-center text-xl inset-0 absolute">
                    <FaSpinner className="animate-spin text-primary" />
                  </div>
                )}
                {/* Image */}
                <div className="relative w-full sm:w-28 sm:min-w-28">
                  <div className="bg-gray-100 p-3 shadow rounded-xl flex items-center justify-center min-h-27.5">
                    <Link href={`products/${cart.product._id}`}>
                      <Image
                        width={300}
                        height={300}
                        src={cart.product.imageCover}
                        alt={cart.product.title}
                        className="w-20 h-20 object-contain hover:scale-110 transition-all"
                      />
                    </Link>
                  </div>
                  {cart.product.quantity > 0 && (
                    <div className="absolute flex items-center justify-center gap-1 py-1 text-xs font-semibold rounded-2xl px-2 bottom-2 right-2 bg-primary-500 text-white">
                      <FaCheck /> In Stock
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 space-y-2">
                  <Link
                    href={`/products/${cart.product._id}`}
                    className="inline-block hover:underline mb-2"
                  >
                    <h3 className="font-semibold text-base line-clamp-3 w-full sm:text-lg text-heading">
                      {cart.product.title}
                    </h3>
                  </Link>
                  <div className="text-xs flex items-center gap-2 flex-wrap">
                    <Link
                      href={`products/?subCategory=${cart.product.category._id}`}
                      className="py-1 px-2.5 text-primary-500 bg-primary-100 rounded-xl"
                    >
                      {cart.product.category.name}
                    </Link>
                    <span className="text-gray-400">
                      SKU: {cart.product._id.slice(-6).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <span className="text-primary font-bold text-lg leading-7">
                      {cart.price} EGP
                    </span>
                    <span className="text-gray-400 text-xs"> per unit</span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex bg-gray-100 p-1 rounded-2xl items-center    gap-1 ">
                      <button
                        disabled={
                          LoadingUpdateId === cart.product._id ||
                          cart.count == 1
                        }
                        onClick={() =>
                          handleUpdateProduct(cart.product._id, cart.count - 1)
                        }
                        className="w-9 h-9 rounded-lg bg-white text-gray-500 shadow text-2xl cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        -
                      </button>
                      <span className="w-9 h-9 flex items-center justify-center rounded-lg text-heading font-bold text-sm">
                        {cart.count}
                      </span>
                      <button
                        disabled={LoadingUpdateId === cart.product._id}
                        onClick={() =>
                          handleUpdateProduct(cart.product._id, cart.count + 1)
                        }
                        className="w-9 h-9 rounded-lg bg-primary text-white shadow text-2xl cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        +
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="block text-xs text-gray-500">
                          Total
                        </span>
                        <span className="text-heading font-bold text-xl leading-7">
                          {cart.price * cart.count}
                          <span className="text-sm text-gray-500 font-normal">
                            {" "}
                            EGP
                          </span>
                        </span>
                      </div>
                      <button
                        onClick={() => handleDeleteFromCart(cart.product._id)}
                        className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center self-end text-red-600 border border-red-300 shadow hover:bg-red-500 hover:text-white transition-colors hover:border-0 cursor-pointer"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      )}
    </>
  );
};

export default ShoppingCard;
