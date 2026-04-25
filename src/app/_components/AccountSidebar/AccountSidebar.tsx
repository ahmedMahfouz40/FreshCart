"use client";
import Link from "next/link";
import React from "react";
import { FaGear, FaLocationDot } from "react-icons/fa6";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { usePathname } from "next/navigation";
const navLinks = [
  {
    href: "/profile/address",
    label: "My Addresses",
    icon: <FaLocationDot />,
  },
  { href: "/profile/settings", label: "Settings", icon: <FaGear /> },
];

const AccountSidebar = () => {
  const pathname = usePathname();
  return (
    <aside className="w-full">
      <div className="p-4 border-b  border-gray-200 ">
        <h2 className="font-bold text-lg ">My Account</h2>
      </div>
      <nav className="bg-white ">
        <ul className="p-2 ">
          {navLinks.map(({ href, label, icon }) => (
            <li key={href} className="mb-2">
              <Link
                href={href}
                className={` ${pathname === href ? "bg-primary-50 text-primary font-semibold" : "text-gray-500 hover:text-gray-600 hover:bg-primary-50/50  "} py-3 px-4 flex items-center group justify-between gap-3  rounded transition-colors`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`w-8 h-8 rounded-lg  bg-[#F3F4F6] ${pathname === href && "text-white bg-primary"}  flex items-center justify-center `}
                  >
                    {icon}
                  </span>
                  <span className=""> {label}</span>
                </div>
                <span className="text-xl ">
                  <MdOutlineKeyboardArrowRight />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default AccountSidebar;
