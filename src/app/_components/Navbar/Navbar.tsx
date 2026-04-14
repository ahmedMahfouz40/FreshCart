"use client";
import * as React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import logo from "@/images/freshcart-logo.png";
import Image from "next/image";
import { IoIosGift, IoMdSearch } from "react-icons/io";
import { CiHeart, CiUser } from "react-icons/ci";
import {
  FaArrowRightFromBracket,
  FaCartShopping,
  FaHeadset,
  FaPhone,
  FaTruck,
  FaUserPlus,
} from "react-icons/fa6";

import { FaBars, FaHeart, FaUser, FaXmark } from "react-icons/fa6";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { MdOutlineMail } from "react-icons/md";
import { signOut, useSession } from "next-auth/react";
import { FaRegUserCircle } from "react-icons/fa";

import Dropdown from "./Dropdown";
import { cartContext } from "@/app/_context/CartContextProvider";
import { useQuery } from "@tanstack/react-query";
import { getUserWishlist } from "@/app/_actions/wishlist.actions";
export default function Navbar() {
  const { data } = useQuery({
    queryKey: ["wishlist"],
    queryFn: getUserWishlist,
  });
  const count = data?.count || 0;
  const session = useSession();
  const { numOfCartItems } = React.useContext(cartContext);

  function handleSignOut() {
    signOut({ redirect: true, callbackUrl: "/login" });
  }

  return (
    <>
      {/* Top Navbar */}
      <div className="hidden border-b border-gray-100  shadow-xs px-5 xl:px-10 min-w-full  text-sm py-2 lg:flex justify-between  items-center gap-2">
        {/* left Side  */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <FaTruck className="text-primary" />
            <p className=" text-muted-foreground leading-5">
              Free Shipping on Orders 500 EGP
            </p>
          </div>
          <div className="flex items-center gap-2 ">
            <IoIosGift className="text-primary" />
            <p className=" text-muted-foreground leading-5">
              New Arrivals Daily
            </p>
          </div>
        </div>
        {/* Right Side  */}
        <div className="flex items-center gap-5  text-muted-foreground">
          <div className="flex items-center gap-5 border-e pe-5">
            <div className="flex items-center gap-1  cursor-pointer hover:text-primary">
              <FaPhone />
              <span> +1 (800) 123-4567</span>
            </div>
            <div className="flex items-center gap-1 cursor-pointer hover:text-primary">
              <MdOutlineMail />
              <span>support@freshcart.com</span>
            </div>
          </div>

          {session.data ? (
            <>
              {/* If User Authenticated */}
              <div className="flex items-center gap-3 ">
                <Link
                  href={"/profile"}
                  className="flex items-center gap-1  hover:text-primary transition-all"
                >
                  <CiUser />
                  <span>{session.data.user?.name}</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-1 cursor-pointer text-[#4A5565] hover:text-error-400 transition-all"
                >
                  <FaArrowRightFromBracket />
                  <span>Sign Out</span>
                </button>
              </div>
            </>
          ) : (
            <>
              {/* If User UnAuthenticated */}
              <div className="flex items-center gap-3 ">
                <Link
                  href={"/login"}
                  className="flex items-center gap-1 hover:text-primary-600"
                >
                  <CiUser />
                  <span>Sign In</span>
                </Link>
                <Link
                  href={"/signup"}
                  className="flex items-center gap-1 text-[#4A5565]  hover:text-primary-600"
                >
                  <FaUserPlus />
                  <span>Sign Up</span>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
      {/* Main Navbar */}
      <div className="sticky top-0 z-50  bg-white shadow">
        <NavigationMenu className="py-3  px-1 xl:px-10 ">
          <Link href={"/"}>
            <Image src={logo} alt="logo" />
          </Link>
          {/* Search Input  */}
          <button className="flex-1 mx-4 relative hidden lg:block">
            <input
              type="search"
              className="py-3 w-full ps-5 pe-8 border  border-[#E5E7EB] bg-white text-[#36415380] font-medium  rounded-2xl"
              placeholder="Search For Products, brands and more..."
            />
            <div className="absolute inset-e-3 top-1/2 -translate-y-1/2 bg-primary rounded-full w-9 h-9  flex items-center justify-center text-white text-xl">
              <IoMdSearch />
            </div>
          </button>
          <NavigationMenuList className="text-[#364153] hidden lg:flex">
            <NavigationMenuItem>
              {/* Home Link */}
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link className="hover:text-primary transition-colors" href="/">
                  Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            {/* Shop Link */}
            <NavigationMenuItem className="peer bg-transparent!">
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link
                  className="hover:text-primary transition-colors"
                  href="/products"
                >
                  Shop
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            {/* Brands Link */}
            <NavigationMenuItem className="peer bg-transparent!">
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link
                  className="hover:text-primary transition-colors"
                  href="/brands"
                >
                  Brands
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
          {/* Category Dropdown */}
          <div className="mx-2 hidden lg:block">
            <Dropdown />
          </div>

          <div className="flex gap-3 text-xl text-muted-foreground pe-3 items-center">
            <div className="cursor-pointer hover:opacity-75 transition-all hidden lg:flex gap-2 border-r items-center border-[#E5E7EB] pe-3">
              <span className="text-primary bg-primary/5 flex items-center justify-center text-sm rounded-full w-10  h-10 ">
                <FaHeadset />
              </span>

              <div className="">
                <div className="text-[12px] leading-4 text-gray-400">
                  Support
                </div>
                <div className="text-sm font-semibold"> 24/7 Help</div>
              </div>
            </div>
            <Link
              href={"/wishlist"}
              title="wishlist"
              className="relative hover:bg-red-50/50 hover:text-red-500 cursor-pointer w-10 h-10 rounded-full flex items-center justify-center"
            >
              <CiHeart />
              {count > 0 && (
                <span className="absolute -top-1 inset-e-0 font-bold  text-xs text-white w-5 h-5 flex items-center justify-center rounded-full bg-red-500">
                  {count}
                </span>
              )}
            </Link>
            <Link
              href={"/cart"}
              title="cart"
              className="relative hover:bg-primary-50/50 hover:text-primary cursor-pointer w-10 h-10 rounded-full flex items-center justify-center"
            >
              <FaCartShopping />
              {numOfCartItems > 0 && (
                <span className="absolute -top-1 inset-e-0 font-bold  text-xs text-white w-5 h-5 flex items-center justify-center rounded-full bg-primary">
                  {numOfCartItems}
                </span>
              )}
            </Link>
            <div className="hidden lg:block">
              {session.data ? (
                <div
                  title="profile"
                  className="hidden lg:flex items-center justify-center hover:bg-primary-50/50  hover:text-primary cursor-pointer w-10 h-10 rounded-full "
                >
                  <FaRegUserCircle />
                </div>
              ) : (
                <Link
                  href={"/login"}
                  className="py-2.5 px-4 bg-primary/90 hover:bg-primary transition text-white  rounded-2xl cursor-pointer flex items-center gap-1 text-sm font-semibold "
                >
                  <CiUser /> Sign In
                </Link>
              )}
            </div>
            {/* Trigger */}
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger className="flex items-center justify-center lg:hidden cursor-pointer text-white bg-primary hover:bg-primary-700 transition-colors w-10 h-10  rounded-full">
                  <FaBars />
                </SheetTrigger>
                <SheetContent showCloseButton={false}>
                  <SheetHeader className="bg-gray-50 py-5 border-b-gray-200  items-center flex-row justify-between">
                    <SheetTitle>
                      <Image src={logo} alt="logo" />
                    </SheetTitle>
                    <SheetClose className="w-10 h-10 rounded-full cursor-pointer bg-gray-100 flex items-center justify-center hover:bg-red-50 transition-colors ">
                      <FaXmark className="text-gray-500 text-lg" />
                    </SheetClose>
                  </SheetHeader>
                  <div className="px-4 overflow-y-auto h-[calc(100vh-80px)] py-6">
                    <button className=" w-full relative ">
                      <input
                        type="search"
                        className="py-3 w-full ps-5 pe-8 border  border-[#E5E7EB] bg-white text-gray-600 font-medium  rounded-2xl"
                        placeholder="Search  Products ..."
                      />
                      <div className="absolute inset-e-3 top-1/2 -translate-y-1/2 bg-primary rounded-full w-9 h-9  flex items-center justify-center text-white text-xl">
                        <IoMdSearch />
                      </div>
                    </button>
                    <div className="text-[#364153] my-4 border-b border-gray-200">
                      {/* Home Link */}
                      <div className="w-full   mb-3">
                        <Link
                          className="hover:text-primary p-4 hover:bg-primary-50/50 rounded-xl transition-colors w-full block"
                          href="/"
                        >
                          Home
                        </Link>
                      </div>
                      {/* Shop Link */}
                      <div className="peer bg-transparent!">
                        <div className="w-full   mb-3">
                          <Link
                            className="hover:text-primary p-4 hover:bg-primary-50/50 rounded-xl transition-colors w-full block"
                            href="/products"
                          >
                            Shop
                          </Link>
                        </div>
                      </div>
                      {/* categories Link */}
                      <div className="peer bg-transparent!">
                        <div className="w-full   mb-3">
                          <Link
                            className="hover:text-primary p-4 hover:bg-primary-50/50 rounded-xl transition-colors w-full block"
                            href="/categories"
                          >
                            Categories
                          </Link>
                        </div>
                      </div>
                      {/* Brands Link */}
                      <div className="peer bg-transparent!">
                        <div className="w-full   mb-3">
                          <Link
                            className="hover:text-primary p-4 hover:bg-primary-50/50 rounded-xl transition-colors w-full block"
                            href="/brands"
                          >
                            Brands
                          </Link>
                        </div>
                      </div>
                    </div>
                    {/* wishlist & cart  */}
                    <div className="border-b border-gray-200 my-4 pb-4">
                      <Link
                        className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-primary-50/50 transition-colors"
                        href="/wishlist"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center">
                            <FaHeart className="text-red-500" />
                          </div>
                          <span className="font-medium text-gray-700">
                            Wishlist
                          </span>
                        </div>
                        <span
                          className={`${count == 0 && "hidden"} bg-primary-600 text-white text-xs font-bold px-2.5 py-1 rounded-full `}
                        >
                          {count}
                        </span>
                      </Link>
                      <Link
                        className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-primary-50/50 transition-colors"
                        href="/cart"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-primary-50 flex items-center justify-center">
                            <FaCartShopping className="text-primary-600" />
                          </div>
                          <span className="font-medium text-gray-700">
                            Cart
                          </span>
                        </div>
                        <span
                          className={`${numOfCartItems == 0 && "hidden"} bg-primary-600 text-white text-xs font-bold px-2.5 py-1 rounded-full `}
                        >
                          {numOfCartItems}
                        </span>
                      </Link>
                    </div>
                    <div className="p-4 space-y-1">
                      {session.data ? (
                        <div>
                          <Link
                            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary-50/50 transition-colors"
                            href="/profile"
                          >
                            <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                              <FaUser className="text-gray-500" />
                            </div>
                            <span className="font-medium text-gray-700">
                              {session?.data?.user?.name}
                            </span>
                          </Link>
                          <button
                            onClick={handleSignOut}
                            className="flex items-center gap-3 px-4 py-3 cursor-pointer rounded-xl hover:bg-red-50 transition-colors w-full text-left"
                          >
                            <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center">
                              <FaArrowRightFromBracket className="text-red-500" />
                            </div>
                            <span className="font-medium text-red-600">
                              Sign Out
                            </span>
                          </button>
                        </div>
                      ) : (
                        <div className="p-4 space-y-1">
                          <div className="grid grid-cols-2 gap-3 pt-2">
                            <Link
                              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors"
                              href="/login"
                            >
                              Sign In
                            </Link>
                            <Link
                              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-primary-600 text-primary-600 font-semibold hover:bg-primary-50 transition-colors"
                              href="/signup"
                            >
                              Sign Up
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                    <Link
                      className="mx-4 mt-2 p-4 rounded-xl bg-gray-50 border border-gray-100 flex items-center gap-3 hover:bg-primary-50 transition-colors"
                      href="/contact"
                    >
                      <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                        <FaHeadset className="text-primary" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-700">
                          Need Help?
                        </div>
                        <div className="text-sm text-primary-600">
                          Contact Support
                        </div>
                      </div>
                    </Link>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </NavigationMenu>
      </div>
    </>
  );
}
