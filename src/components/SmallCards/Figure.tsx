"use client";
import { FaShieldAlt } from "react-icons/fa";
import { FaHeadset, FaTruck } from "react-icons/fa6";
import { IoReload } from "react-icons/io5";
import { motion } from "framer-motion";

const Figure = () => {
  const figure = [
    {
      icon: <FaTruck />,
      title: "Free Shipping",
      desc: "On orders over 500 EGP",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      icon: <FaShieldAlt />,
      title: "Secure Payment",
      desc: "100% secure transactions",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-600",
    },
    {
      icon: <IoReload />,
      title: "Easy Returns",
      desc: "14-day return policy",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
    },
    {
      icon: <FaHeadset />,
      title: "24/7 Support",
      desc: "Dedicated support team",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
  ];
  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 my-5 gap-4  lg:w-[90%] mx-auto py-8">
        {figure.map((fig) => {
          return (
            <motion.div
              key={fig.title}
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              viewport={{ once: false, amount: 0.2 }}
              className="flex items-center gap-2 rounded-xl p-3 shadow-xl border "
            >
              <span
                className={`${fig.bgColor} ${fig.textColor} w-12 h-12 flex items-center justify-center rounded-full`}
              >
                {fig.icon}
              </span>
              <div>
                <h3 className="font-semibold mb-1">{fig?.title}</h3>
                <p className="text-xs text-[#6A7282]">{fig?.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </>
  );
};

export default Figure;
