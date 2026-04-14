import Image from "next/image";
import logo from "@/images/freshcart-logo.png";
import {
  FaFacebookF,
  FaHeadset,
  FaInstagram,
  FaLocationDot,
  FaPhone,
  FaTruck,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { HiMiniCreditCard } from "react-icons/hi2";
import { MdEmail } from "react-icons/md";
import Link from "next/link";
import Container from "../Container/Container";
import { IoMdRefresh } from "react-icons/io";
import { FaShieldAlt } from "react-icons/fa";

const Footer = () => {
  const Layout = [
    { title: "Free Shipping", desc: "On orders over 500 EGP", icon: FaTruck },
    {
      title: "Easy Returns",
      desc: "14-day return policy",
      icon: IoMdRefresh,
    },
    {
      title: "Secure Payment",
      desc: "100% secure checkout",
      icon: FaShieldAlt,
    },
    { title: "24/7 Support", desc: "Contact us anytime", icon: FaHeadset },
  ];

  const shopList = [
    { label: "All Products", link: "/allProducts" },
    { label: "Categories", link: "/categories" },
    { label: "Brands", link: "/Brands" },
    { label: "Electronics", link: "/Electronics" },
    { label: "Mens&apos;s Fashion", link: "/MensFashion" },
    { label: "women&apos;s Fashion", link: "/WemenFashion" },
  ];
  const accountList = [
    { label: "My Account", link: "/profile" },
    { label: "Order History", link: "/orders" },
    { label: "Wishlist", link: "/wishlist" },
    { label: "Shopping Cart", link: "/cart" },
    { label: "Sign In", link: "/login" },
    { label: "Create Account", link: "/signup" },
  ];
  const supportList = [
    { label: "Contact Us", link: "/contact" },
    { label: "Help Center", link: "/help" },
    { label: "Shipping Info", link: "/shipping" },
    { label: "Returns & Refunds", link: "/returns" },
    { label: "Track Order", link: "/orders" },
  ];
  const legaltList = [
    { label: "Privacy Policy", link: "/privacy" },
    { label: "Terms Of Service", link: "/service" },
    { label: "Cookie Policy", link: "/ppolicy" },
  ];

  return (
    <>
      <div className="bg-primary-50 py-6">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {Layout.map((card) => (
              <div key={card.title} className="flex items-center gap-2 text-xl">
                <span className="h-12 w-12 rounded-xl flex items-center justify-center bg-primary-200 text-primary ">
                  <card.icon />
                </span>
                <div>
                  <h4 className="text-sm font-semibold leading-5 text-heading">
                    {card.title}
                  </h4>
                  <p className="text-xs leading-4 text-[#6A7282]">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>
      <div className="bg-heading">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 py-12 ">
            <div className="col-span-1 sm:col-span-2 space-y-5 text-center sm:text-left flex flex-col items-center sm:items-start">
              <Link
                href={"/"}
                className="logo block bg-white rounded-lg px-4 py-2 max-w-50"
              >
                <Image src={logo} alt="logo" className="w-full" />
              </Link>
              <p className="text-gray-400  text-sm leading-5">
                FreshCart is your one-stop destination for quality products.
                From fashion to electronics, we bring you the best brands at
                competitive prices with a seamless shopping experience.
              </p>
              <ul className="text-gray-400 text-sm space-y-3">
                <li className="flex items-center justify-center sm:justify-start">
                  <Link
                    className="flex items-center  transition-colors hover:text-primary-500"
                    href={"/"}
                  >
                    <FaPhone className="text-primary me-2  " /> +1 (800)
                    123-4567
                  </Link>
                </li>
                <li className="flex items-center justify-center sm:justify-start">
                  <Link
                    className="flex items-center  transition-colors hover:text-primary-500"
                    href={"/"}
                  >
                    <MdEmail className="text-primary me-2 " />
                    support@freshcart.com
                  </Link>
                </li>
                <li className="flex items-center justify-center sm:justify-start">
                  <FaLocationDot className="text-primary me-2 " /> 123 Commerce
                  Street, New York, NY 10001
                </li>
              </ul>
              <div className="flex gap-2 items-center text-[#99A1AF] ">
                <span className="w-10 h-10 flex items-center justify-center rounded-full cursor-pointer bg-[#1E2939] hover:bg-primary  transition-colors hover:text-white">
                  <FaFacebookF />
                </span>
                <span className="w-10 h-10 flex items-center justify-center rounded-full cursor-pointer bg-[#1E2939]  hover:bg-primary  transition-colors hover:text-white">
                  <FaTwitter />
                </span>
                <span className="w-10 h-10 flex items-center justify-center rounded-full cursor-pointer bg-[#1E2939]   hover:bg-primary  transition-colors hover:text-white">
                  <FaInstagram />
                </span>
                <span className="w-10 h-10 flex items-center justify-center rounded-full cursor-pointer bg-[#1E2939]   hover:bg-primary  transition-colors hover:text-white">
                  <FaYoutube />
                </span>
              </div>
            </div>

            <div className="col-span-1 text-center sm:text-start">
              <h3 className="mb-4 text-white text-xl leading-7 ">Shop</h3>
              <ul className="text-[#99A1AF] space-y-3">
                {shopList.map((item) => (
                  <li key={item.link}>
                    <Link
                      className=" transition-colors hover:text-primary-500"
                      href={item.link}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-1 text-center sm:text-start  ">
              <h3 className="mb-4 text-white text-xl leading-7  ">Account</h3>
              <ul className="text-[#99A1AF] space-y-3">
                {accountList.map((item) => (
                  <li key={item.link}>
                    <Link
                      className=" transition-colors hover:text-primary-500"
                      href={item.link}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-1 text-center sm:text-start  ">
              <h3 className="mb-4 text-white text-xl leading-7  ">Support</h3>
              <ul className="text-[#99A1AF] space-y-3">
                {supportList.map((item) => (
                  <li key={item.link}>
                    <Link
                      className=" transition-colors hover:text-primary-500"
                      href={item.link}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-1 text-center sm:text-start  ">
              <h3 className="mb-4 text-white text-xl leading-7  ">Legal</h3>
              <ul className="text-[#99A1AF] space-y-3">
                {legaltList.map((item) => (
                  <li key={item.link}>
                    <Link
                      className=" transition-colors hover:text-primary-500"
                      href={item.link}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>

        <Container>
          <div className="flex flex-col justify-center items-center sm:flex-row  sm:justify-between  gap-4 border-t-2 border-[#1E2939] py-6">
            <p className="text-[#6A7282] text-sm leading-5">
              © 2026 FreshCart. All rights reserved.
            </p>
            <div className="flex gap-3 items-center text-[#6A7282] text-sm ">
              <span className="flex items-center gap-2">
                <HiMiniCreditCard /> Visa
              </span>
              <span className="flex items-center gap-2">
                <HiMiniCreditCard /> Mastercard
              </span>
              <span className="flex items-center gap-2">
                <HiMiniCreditCard /> PayPal
              </span>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Footer;
