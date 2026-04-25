"use client";
import Container from "@/app/_components/Container/Container";
import { FaShoppingCart } from "react-icons/fa";
import ShoppingCard from "../../_components/ShoppingCard/ShoppingCard";
import ShoppingSidebar from "../../_components/ShoppingSidebar/ShoppingSidebar";
import Link from "next/link";
import ClearCart from "@/app/_components/Buttons/ClearCart";
import { useAppSelector } from "@/hooks/reduxHooks";

const Page = () => {
  const { numOfCartItems } = useAppSelector((state) => state.cartReducer);
  return (
    <div className="bg-gray-50 relative">
      <Container>
        <div className="header space-y-5 py-4">
          <div className="text-sm leading-5">
            <span className=" text-muted-foreground">Home / </span>
            <span className="text-heading">Shopping Cart</span>
          </div>
          <div className="flex items-center gap-2 text-3xl">
            <span className="w-12 h-12 bg-primary-600 text-white flex items-center justify-center  rounded-xl">
              <FaShoppingCart />
            </span>
            <h3 className="font-bold  text-heading">Shopping Cart</h3>
          </div>
          <p className="text-muted-foreground font-semibold leading-4">
            You have{" "}
            <span className="text-primary-600"> {numOfCartItems} items</span> in
            your cart
          </p>
        </div>
        <div className="lg:grid lg:grid-cols-12 gap-6">
          <div className="col-span-8 h-full">
            {/* card */}
            <ShoppingCard />

            <div className="flex justify-between items-center text-sm my-5 py-8 border-t  border-gray-300">
              <Link
                href="/"
                className="text-primary hover:text-primary-700 transition-colors leading-5"
              >
                ← Continue Shopping
              </Link>
              <ClearCart />
            </div>
          </div>
          <div className="col-span-4 ">
            <div className="sticky top-20 shadow-lg rounded-2xl overflow-hidden">
              <ShoppingSidebar />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Page;
