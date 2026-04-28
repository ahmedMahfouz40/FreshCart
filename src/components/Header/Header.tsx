import React, { ReactNode } from "react";
import Container from "../Container/Container";
import Link from "next/link";

const Header = ({
  icon,
  title,
  desc,
  subCategTitle,
  style,
}: {
  icon: ReactNode;
  title: string;
  desc: string;
  subCategTitle?: string;
  style?: string[];
}) => {
  return (
    <div>
      <div
        className={` ${style ? style.join(" ") : " bg-linear-to-br from-[#16A34A] via-[#22C55E] to-[#4ADE80] text-white"}   w-full  py-10 px-4`}
      >
        <Container>
          <div className="space-y-5">
            <p className="text-sm leading-5 ">
              <Link
                href={"/"}
                className="opacity-70 hover:opacity-100 transition-colors"
              >
                Home /
              </Link>
              <span> {title}</span>
              <span>
                {subCategTitle && "/"} {subCategTitle}
              </span>
            </p>
            <div className="flex flex-wrap  items-center gap-3">
              <div className="w-14 h-14  sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-2xl sm:text-4xl  bg-white/20">
                {icon}
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl leading-10 font-bold ">
                  {title}
                </h1>
                <p className="opacity-80 text-sm sm:tex-[16px]">{desc}</p>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Header;
