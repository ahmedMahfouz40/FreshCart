"use client";
import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { FaBox, FaClock, FaLocationDot, FaPhone } from "react-icons/fa6";
import { TbCashBanknote, TbReceipt } from "react-icons/tb";
import { FaCalendarAlt } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { orderData } from "@/types/order.type";
import { formatDate } from "@/utils/formateDate";
const OrderCard = ({ order }: { order: orderData }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`border rounded-2xl  mb-5 ${isOpen ? "border-[#BBF7D0]" : "border-[#F3F4F6]"}  shadow hover:shadow-lg transition-all`}
    >
      <div className="flex gap-3 border-b border-[#F3F4F6] p-4">
        {/* Image — fixed small size on all screens */}
        <div className="shrink-0 w-18 h-18 sm:w-20 sm:h-20">
          <div className="p-2 w-full h-full bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center">
            <Image
              width={400}
              height={400}
              src={order.cartItems[0].product.imageCover}
              alt={order.cartItems[0].product.category.name}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <div className="flex-1 min-w-0 flex flex-col gap-2">
          {/* Top row */}
          <div className="flex items-start justify-between gap-2">
            <div className="space-y-1">
              <Badge className="bg-[#FEF3C6] text-[#E17100] flex items-center gap-1 text-xs">
                <FaClock size={10} /> Processing
              </Badge>
              <h3 className="font-bold text-base text-heading leading-6">
                <span className="text-[#99A1AF] text-sm font-normal"># </span>
                {order.id}
              </h3>
            </div>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-[#F3F4F6]">
              <TbCashBanknote />
            </div>
          </div>

          {/* Meta*/}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#6A7282]">
            <span className="flex gap-1 items-center">
              <FaCalendarAlt /> {formatDate(order.createdAt)}
            </span>
            <span className="text-gray-300">·</span>
            <span className="flex gap-1 items-center">
              <FaBox /> {order.cartItems.length} item
            </span>
            <span className="text-gray-300">·</span>
            <span className="flex gap-1 items-center">
              <FaLocationDot /> {order.shippingAddress.city}
            </span>
          </div>

          {/* Price + Button */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="font-bold text-xl text-heading">
              {order.totalOrderPrice}
              <span className="text-sm font-medium text-[#99A1AF] ms-1">
                EGP
              </span>
            </div>
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className={`py-2 px-4 flex items-center gap-1.5 rounded-xl cursor-pointer text-xs font-semibold
          ${isOpen ? "bg-primary text-white" : "bg-primary-100 text-primary"}`}
            >
              {isOpen ? "Hide" : "Details"}
              <IoIosArrowDown
                size={14}
                className="transition-transform duration-300"
                style={{
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
              />
            </button>
          </div>
        </div>
      </div>
      {/* Toggle Content */}
      <div
        className={`bg-gray-50 overflow-hidden transition-all duration-500 ease-in-out
                  ${isOpen ? "max-h-250 p-2 sm:p-6 opacity-100" : "max-h-0 p-0 opacity-0"}`}
      >
        {/* border items */}
        <div>
          <h4 className="flex mb-5 mt-2 items-center gap-2 text-heading font-semibold text-sm leading-5">
            <span className="w-6 h-6  flex items-center justify-center bg-[#DCFCE7] rounded-lg text-primary-700">
              <TbReceipt />
            </span>
            Order Items
          </h4>
          {/* order Items */}
          {order.cartItems.map((cart) => (
            <>
              <div key={cart._id} className="flex mb-4 gap-2 items-center justify-between rounded-xl bg-white border border-gray-100 p-4">
                {/* Left side */}
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <div className="shrink-0 relative p-2 rounded-xl bg-[#F9FAFB] w-16 ">
                    <Image
                      src={cart.product.imageCover}
                      width={300}
                      height={300}
                      alt={cart.product.category.name}
                      className="w-full"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-heading truncate">
                      {cart.product.title}
                    </p>
                    <p className="text-sm leading-5 text-gray-500">
                      {cart.count} × {cart.price} EGP
                    </p>
                  </div>
                </div>

                {/* Right side */}
                <div className="shrink-0 text-right ml-2">
                  <p className="text-heading text-lg leading-7 font-bold">
                    {cart.count * cart.price}
                  </p>
                  <p className="text-xs text-[#99A1AF] leading-4">EGP</p>
                </div>
              </div>
            </>
          ))}
        </div>
        {/* Delivery Address & Order Summary  */}
        <div className="flex flex-col md:flex-row my-5 gap-4 items-center ">
          <div className="w-full md:w-1/2 box p-4 border border-gray-200 rounded-2xl bg-white space-y-4">
            <h4 className="flex items-center gap-2 text-heading text-sm font-semibold">
              <span className="w-6 h-6 flex items-center justify-center rounded-lg bg-[#DCFCE7] text-[#155DFC]">
                <FaLocationDot />
              </span>
              Delivery Address
            </h4>
            <p className="text-heading ">{order.shippingAddress.city}</p>
            <p className="text-sm text-[#4A5565] leading-5">
              <span>{order.shippingAddress.city}</span> ,
              <span>{order.shippingAddress.details}</span>
            </p>
            <p className="flex items-center gap-2 text-[#4A5565] text-sm leading-5">
              <FaPhone /> {order.shippingAddress.phone}
            </p>
          </div>
          <div className="w-full md:w-1/2 box p-4 border border-[#FEE685] rounded-2xl bg-[#FEF3C6] space-y-4">
            <h4 className="flex items-center gap-2 text-heading text-sm font-semibold">
              <span className="w-6 h-6 flex items-center justify-center rounded-lg bg-[#FE9A00] text-white">
                <FaClock />
              </span>
              Order Summary
            </h4>
            <div className="text-sm leading-5 gap-2 text-[#4A5565]  space-y-2">
              <div className="flex items-center justify-between ">
                <span>Subtotal</span>
                <span>{order.totalOrderPrice - order.shippingPrice} EGP</span>
              </div>
              <div className="flex items-center justify-between text-sm leading-5 gap-2 text-[#4A5565]">
                <span>Shipping</span>
                <span>
                  {order.shippingPrice == 0 ? "FREE" : order.shippingPrice}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between leading-7 gap-2 text-heading">
              <span>Total</span>
              <span className="font-bold text-lg">
                {order.totalOrderPrice} EGP
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
