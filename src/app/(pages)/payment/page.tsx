"use client";
import BackToCart from "@/components/Buttons/BackToCart";
import Container from "@/components/Container/Container";
import { FaShieldAlt } from "react-icons/fa";
import {
  FaBookmark,
  FaHouse,
  FaLock,
  FaReceipt,
  FaSpinner,
  FaTruck,
} from "react-icons/fa6";

import InfoBanner from "@/components/InfoBanner/InfoBanner";
import { BsBox2Fill } from "react-icons/bs";
import Image from "next/image";

import OrderSummaryCart from "@/app/_skeletons/OrderSummaryCart";

import PaymentEmpty from "@/components/PaymentEmpty/PaymentEmpty";

import { useAppSelector } from "@/hooks/reduxHooks";
import { useState } from "react";
import PaymentLoading from "@/components/PaymentLoading/PaymentLoading";
import CheckoutForm from "@/app/_Forms/CheckoutForm";
import { shallowEqual } from "react-redux";

const Page = () => {
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);

  const {
    isSuccess,
    isLoading,
    numOfCartItems,
    totalCartPrice,
    cartId,
    cartProducts,
  } = useAppSelector(
    (state) => ({
      isSuccess: state.cartReducer.isSuccess,
      isLoading: state.cartReducer.isLoading,
      numOfCartItems: state.cartReducer.numOfCartItems,
      totalCartPrice: state.cartReducer.totalCartPrice,
      cartId: state.cartReducer.cartId,
      cartProducts: state.cartReducer.cartProducts,
    }),
    shallowEqual,
  );
  if (!isSuccess) return <PaymentLoading />;
  if (numOfCartItems === 0) return <PaymentEmpty />;
  return (
    <div className="bg-gray-50">
      <Container>
        <div className="header space-y-5 py-4">
          <div className="text-sm leading-5">
            <span className=" text-muted-foreground">Home / cart / </span>
            <span className="text-heading">Checkout</span>
          </div>
          <div className="flex flex-col gap-4  sm:flex-row justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-3xl">
                <span className="w-12 h-12 bg-primary-600 text-white flex items-center justify-center  rounded-xl">
                  <FaReceipt />
                </span>
                <h2 className="font-bold  text-heading">Complete Your Order</h2>
              </div>
              <p className="text-muted-foreground font-semibold leading-4">
                Review your items and complete your purchase
              </p>
            </div>
            <div className="self-end sm:self-stretch">
              <BackToCart />
            </div>
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-12 gap-6 ">
          {/* Left Side */}
          <div className="col-span-8  rounded-2xl bg-white overflow-hidden ">
            {/* Shipping Address */}
            <div>
              <InfoBanner
                icon={<FaHouse />}
                title="Shipping Address"
                desc="Where should we deliver your order?"
              />
              <div className="space-y-4    p-4 rounded-2xl">
                <div className="  space-y-2 ">
                  <span className="flex items-center gap-2 text-gray-800 font-semibold">
                    <FaBookmark className="text-primary" /> Saved Addresses
                  </span>
                  <p className="text-sm text-gray-600">
                    Select a saved address or enter a new one below
                  </p>
                </div>
              </div>
            </div>

            <CheckoutForm
              cartId={cartId}
              setIsPaymentLoading={setIsPaymentLoading}
            />
          </div>

          {/* Right side */}

          <div className="col-span-4  rounded-2xl  ">
            <div className="sticky top-20">
              <InfoBanner
                icon={<FaLock />}
                title="Order Summary"
                desc={`${numOfCartItems} items`}
              />
              <div className="bg-white shadow p-5 mb-3 rounded-b-2xl">
                <div className="max-h-56 overflow-y-auto  ">
                  {/*   Item */}
                  {isLoading ? (
                    <>
                      {Array.from({ length: numOfCartItems }).map((_, i) => (
                        <OrderSummaryCart key={i} />
                      ))}
                    </>
                  ) : (
                    cartProducts?.map((item) => (
                      <div
                        key={item.product._id}
                        className="p-3  mb-4 bg-[#F9FAFB] rounded-xl flex flex-wrap items-center justify-end gap-3"
                      >
                        <div className="flex-1 flex  items-center gap-3">
                          <div className="w-14 h-14 bg-white rounded relative">
                            <Image
                              src={item.product.imageCover}
                              fill
                              alt={item.product.title}
                              sizes="56px"
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h5 className="text-sm text-heading leading-5 self-start truncate max-w-45">
                              {item.product.title}
                            </h5>
                            <p className="text-xs text-[#6A7282] leading-4">
                              {item.count} × {item.price} EGP
                            </p>
                          </div>
                        </div>
                        <span className="text-sm  font-bold text-heading">
                          {(item.price * item.count).toFixed(2)}
                        </span>
                      </div>
                    ))
                  )}
                </div>
                <div className="py-5 border-t border-gray-200">
                  <div className="mb-5">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-500">Subtotal</span>
                        <span className="text-primary">
                          {totalCartPrice} EGP
                        </span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-500 flex items-center gap-2">
                          <FaTruck /> Shipping
                        </span>
                        <span className="text-primary">FREE</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mb-2 pt-2 border-t">
                      <span className="text-heading font-bold text-lg">
                        Total
                      </span>
                      <div>
                        <span className="text-primary font-bold text-2xl">
                          {totalCartPrice}
                        </span>
                        <span className="text-gray-400 text-sm">EGP</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Btn */}
                <button
                  form="myForm"
                  type="submit"
                  disabled={isPaymentLoading}
                  className={`bg-linear-to-r disabled:opacity-50 disabled:cursor-not-allowed from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800  text-white transition-colors flex items-center justify-center w-full  text-sm cursor-pointer rounded-xl  py-4 gap-2`}
                >
                  {isPaymentLoading ? (
                    <>
                      <FaSpinner className="animate-spin" /> Processing...{" "}
                    </>
                  ) : (
                    <>
                      <BsBox2Fill /> Place Order
                    </>
                  )}
                </button>

                <div className="flex items-center flex-wrap gap-2 mt-10 justify-evenly border-t border-gray-100 pt-3 text-center text-sm text-gray-500">
                  <div className="flex items-center gap-1  ">
                    <FaTruck className="text-blue-600" /> Fast Delivery
                  </div>
                  <div className="flex items-center gap-1  ">
                    <BsBox2Fill className="text-orange-600" /> Easy Returns
                  </div>
                  <div className="flex items-center gap-1    ">
                    <FaShieldAlt className="text-green-600" /> Secure
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Page;
