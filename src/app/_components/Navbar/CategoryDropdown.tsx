import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";

const CategoryDropdown = () => {
  return (
    <div>
      <div className="relative group ">
        <button className="flex items-center cursor-pointer gap-1.5 text-gray-700 hover:text-primary-600 hover:bg-primary-50/50 px-1 rounded transition-colors py-2">
          Categories
          <IoIosArrowDown className="text-[10px]  transition-transform group-hover:rotate-180" />
        </button>
        <div className="absolute z-50 top-full left-0 pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
          <div className="bg-white border border-gray-100 rounded-xl shadow-xl py-2 min-w-50">
            <Link
              className="block px-4 py-2.5 text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
              href="/categories"
            >
              All Categories
            </Link>
            <Link
              className="block px-4 py-2.5 text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
              href="/products?subCategory=6439d2d167d9aa4ca970649f"
            >
              Electronics
            </Link>
            <Link
              className="block px-4 py-2.5 text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
              href="/products?subCategory=6439d58a0049ad0b52b9003f"
            >
              Women&apos;s Fashion
            </Link>
            <Link
              className="block px-4 py-2.5 text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
              href="/products?subCategory=6439d5b90049ad0b52b90048"
            >
              Men&apos;s Fashion
            </Link>
            <Link
              className="block px-4 py-2.5 text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
              href="/products?subCategory=6439d30b67d9aa4ca97064b1"
            >
              Beauty &amp; Health
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDropdown;
