"use client";
import Image from "next/image";
import { FaCheck, FaTrash } from "react-icons/fa6";
import { useContext, useState } from "react";
import { cartContext } from "@/app/_context/CartContextProvider";
import { updateCartProduct } from "@/app/_actions/cart.actions";
import { toast } from "sonner";
import CardEmpty from "../CardEmpty/CardEmpty";
import Link from "next/link";
import CartItemSkeleton from "@/app/_skeletons/CartItemSkeleton";
import { useDeleteFromCart } from "@/app/_hooks/useDeleteFromCart";

const ShoppingCard = () => {
  const [LoadingUpdateId, setLoadingupdateId] = useState<string | null>(null);
  const { isLoading: isDeleting, handleDeleteFromCart } = useDeleteFromCart();

  const {
    cartProducts,
    setCartProducts,
    setTotalCartPrice,
    setNumofCartItems,
    isUserDataLoading,
    setCartId,
  } = useContext(cartContext);

  if (isUserDataLoading) {
    return Array.from({ length: 3 }).map((_, i) => (
      <CartItemSkeleton key={i} />
    ));
  }

  if (!cartProducts || cartProducts.length === 0) {
    return <CardEmpty />;
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
        setNumofCartItems(res.numOfCartItems);
        setTotalCartPrice(res.data.totalCartPrice);
        setCartProducts(res.data.products);
        setCartId(res.cartId);
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
      {isUserDataLoading ? (
        Array.from({ length: 3 }).map((_, i) => <CartItemSkeleton key={i} />)
      ) : !cartProducts || cartProducts.length === 0 ? (
        <>
          <CardEmpty />
        </>
      ) : (
        <>
          {cartProducts?.map((cart) => {
            return (
              <div
                key={cart.product._id}
                className={`flex flex-col sm:flex-row gap-3 sm:gap-4 relative
                ${isDeleting === cart.product._id ? "cursor-wait opacity-50 bg-gray-200" : "bg-white"}
                shadow border border-gray-100 rounded-2xl my-4 p-4`}
              >
                {/* Image */}
                <div className="relative w-full sm:w-28 sm:min-w-28">
                  <div className="bg-gray-100 p-3 shadow rounded-xl flex items-center justify-center min-h-27.5">
                    <Link href={`product/${cart.product._id}`}>
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
                  <h3 className="font-semibold text-base sm:text-lg text-heading">
                    {cart.product.title}
                  </h3>
                  <div className="text-xs flex items-center gap-2 flex-wrap">
                    <span className="py-1 px-2.5 text-primary-500 bg-primary-100 rounded-xl">
                      {cart.product.category.name}
                    </span>
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
                    <div className="flex bg-gray-100 p-1 rounded-2xl items-center gap-1">
                      <button
                        disabled={LoadingUpdateId === cart.product._id}
                        onClick={() =>
                          handleUpdateProduct(cart.product._id, cart.count - 1)
                        }
                        className="w-9 h-9 rounded-lg bg-white text-gray-500 shadow text-2xl cursor-pointer disabled:cursor-wait disabled:opacity-50"
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
                        className="w-9 h-9 rounded-lg bg-primary text-white shadow text-2xl cursor-pointer disabled:cursor-wait disabled:opacity-50"
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
                        className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center text-red-600 border border-red-300 shadow hover:bg-red-500 hover:text-white transition-colors hover:border-0 cursor-pointer"
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
