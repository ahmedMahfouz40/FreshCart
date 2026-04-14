"use client";
import Link from "next/link";
import { FaShieldAlt, FaShoppingBag } from "react-icons/fa";
import { FaLock, FaTag, FaTruck } from "react-icons/fa6";
import InfoBanner from "../InfoBanner/InfoBanner";
import { useContext } from "react";
import { cartContext } from "@/app/_context/CartContextProvider";
const ShoppingSidebar = () => {
  const { totalCartPrice, numOfCartItems } = useContext(cartContext);

  return (
    <>
      <div>
        <InfoBanner
          icon={<FaShoppingBag />}
          title="Order Summary"
          desc={` ${numOfCartItems} items in your cart`}
        />
        <div className="bg-white p-5">
          <div className="bg-primary-50 mb-5 shadow shadow-primary-50 rounded-xl p-4 flex items-center gap-2 ">
            <span className="text-primary w-10 h-10 rounded-full flex items-center justify-center text-xl bg-primary-200">
              <FaTruck />
            </span>
            <div className="space-y-1">
              <h4 className="text-primary-700 font-semibold">Free Shipping!</h4>
              <p className="text-primary-500 text-sm">
                You qualify for free delivery
              </p>
            </div>
          </div>
          <div className="mb-5">
            <div>
              <div className="flex justify-between items-center mb-5">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-heading">{totalCartPrice} EGP</span>
              </div>
              <div className="flex justify-between items-center mb-5">
                <span className="text-gray-600">Shipping</span>
                <span className="text-primary">FREE</span>
              </div>
            </div>
            <div className="flex justify-between items-center mb-5 pt-3 border-t border-gray-200 ">
              <span className="text-heading font-semibold">Total</span>
              <div>
                <span className="text-heading font-bold text-2xl">
                  {totalCartPrice}
                </span>
                <span className="text-gray-400 text-sm"> EGP</span>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="space-y-4">
              <button className="text-gray-700 border border-dashed border-gray-400 hover:border-primary hover:text-primary transition-colors  flex items-center justify-center  text-sm cursor-pointer rounded-xl w-full  py-4 gap-2">
                <FaTag /> Apply Promo Code
              </button>

              <Link
                href={`/payment`}
                className="w-full bg-linear-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800  transition-colors text-white flex items-center justify-center  text-sm cursor-pointer rounded-xl shadow shadow-primary-800 py-4 gap-1"
              >
                <FaLock /> Secure Checkout
              </Link>
              <div className="flex items-center gap-4 my-4 justify-center text-sm text-gray-500">
                <div className="flex items-center gap-2   border-e pe-4">
                  <FaShieldAlt className="text-green-600" /> Secure Payment
                </div>
                <div className="flex items-center gap-2">
                  <FaTruck className="text-blue-600" /> Fast Delivery
                </div>
              </div>
              <Link href={"/"} className="text-center text-primary my-5 block">
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShoppingSidebar;
