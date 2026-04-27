"use client";
import Link from "next/link";
import { FaCartShopping, FaHouse, FaBagShopping } from "react-icons/fa6";
const floatingItems = [
  { emoji: "🍎", size: "text-5xl", top: "15%", left: "8%", speed: "slow" },
  { emoji: "🥕", size: "text-3xl", bottom: "20%", left: "6%", speed: "medium" },
  { emoji: "🍋", size: "text-4xl", top: "20%", right: "7%", speed: "fast" },
  { emoji: "🥦", size: "text-4xl", bottom: "25%", right: "8%", speed: "slow" },
  { emoji: "🍓", size: "text-2xl", top: "8%", left: "30%", speed: "medium" },
  { emoji: "🍇", size: "text-2xl", bottom: "10%", right: "28%", speed: "fast" },
];
export default function NotFound() {
  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 via-white to-green-50 flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Floating background icons */}
      <div className="absolute inset-0 pointer-events-none select-none">
        {floatingItems.map((item) => (
          <span
            key={item.emoji}
            style={{
              top: item.top,
              left: item.left,
              right: item.right,
              bottom: item.bottom,
            }}
            className={`absolute ${item.size} text-green-200 opacity-20 animate-float-${item.speed}`}
          >
            {item.emoji}
          </span>
        ))}
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center text-center z-10">
        {/* Cart illustration with 404 badge */}
        <div className="relative mb-6 animate-bounce-subtle">
          <div className="w-44 h-44 bg-white rounded-3xl shadow-xl flex items-center justify-center">
            <FaCartShopping className="text-green-400 text-8xl" />
          </div>
          {/* 404 badge */}
          <div className="absolute -top-4 -right-4 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-sm">404</span>
          </div>
          {/* Shadow beneath card */}
          <div className="mx-auto mt-3 w-24 h-3 bg-green-100 rounded-full blur-sm" />
        </div>

        {/* Text */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mt-2 mb-3">
          Oops! Nothing Here
        </h1>
        <p className="text-gray-500 text-base sm:text-lg max-w-sm mb-8">
          Looks like this page went out of stock! Don&apos;t worry, there&apos;s
          plenty more fresh content to explore.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 active:scale-[0.98] text-white font-semibold px-6 py-3 rounded-2xl transition-all"
          >
            <FaHouse />
            Back to Home
          </Link>
          <Link
            href="/products"
            className="flex items-center justify-center gap-2 border border-green-300 hover:bg-green-50 active:scale-[0.98] text-green-700 font-semibold px-6 py-3 rounded-2xl transition-all"
          >
            <FaBagShopping />
            Browse Products
          </Link>
        </div>
      </div>

      {/* CSS animations */}
      <style jsx>{`
        @keyframes floatSlow {
          0%,
          100% {
            transform: translateY(0px) rotate(-5deg);
          }
          50% {
            transform: translateY(-18px) rotate(5deg);
          }
        }
        @keyframes floatMedium {
          0%,
          100% {
            transform: translateY(0px) rotate(3deg);
          }
          50% {
            transform: translateY(-12px) rotate(-3deg);
          }
        }
        @keyframes floatFast {
          0%,
          100% {
            transform: translateY(0px) rotate(-8deg);
          }
          50% {
            transform: translateY(-8px) rotate(8deg);
          }
        }
        @keyframes bounceSub {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        .animate-float-slow {
          animation: floatSlow 5s ease-in-out infinite;
        }
        .animate-float-medium {
          animation: floatMedium 4s ease-in-out infinite;
        }
        .animate-float-fast {
          animation: floatFast 3s ease-in-out infinite;
        }
        .animate-bounce-subtle {
          animation: bounceSub 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
