"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import React from "react";
import {
  FaRegCircleUser, // trigger button
  FaCircleUser, // avatar in dropdown header
  FaUser, // My Profile
  FaBoxOpen, // My Orders
  FaHeart, // My Wishlist
  FaLocationDot, // Address
  FaGear, // Settings
  FaRightFromBracket, // Sign Out
} from "react-icons/fa6";

export default React.memo(function ProfileDropdown({
  handleSignOut,
  email,
  name,
}: {
  handleSignOut: () => void;
  email: string;
  name: string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="hover:bg-primary-50/50  hover:text-primary cursor-pointer w-10 h-10 rounded-full border-0"
        >
          <FaRegCircleUser />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" w-60">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="border-b border-gray-200 py-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                <FaCircleUser className="text-primary text-xl" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">
                  {name}
                </p>
                <p className="text-xs text-gray-400 truncate">{email}</p>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuItem className="mt-2 ">
            <Link
              className="flex items-center w-full gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-primary-600  transition-colors"
              href="/profile/settings"
            >
              <FaUser className="text-gray-400" />
              My Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              className="flex items-center w-full gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-primary-600  transition-colors"
              href="/allorders"
            >
              <FaBoxOpen className="text-gray-400" />
              My Orders
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              className="flex items-center w-full gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-primary-600  transition-colors"
              href="/wishlist"
            >
              <FaHeart className="text-gray-400" />
              My Wishlist
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              className="flex items-center w-full gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-primary-600  transition-colors"
              href="/profile/address"
            >
              <FaLocationDot className="text-gray-400" />
              Address
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              className="flex items-center w-full gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-primary-600  transition-colors"
              href="/profile/settings"
            >
              <FaGear className="text-gray-400" />
              Settings
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <button
            onClick={handleSignOut}
            className="flex items-center active:scale-[0.98] gap-3 px-4 py-2.5 text-sm text-red-500  transition-colors w-full text-left cursor-pointer"
          >
            <FaRightFromBracket className="w-4" />
            Sign Out
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});
