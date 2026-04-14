import React, { ReactNode } from "react";

const InfoBanner = ({
  icon,
  title,
  desc,
}: {
  icon: ReactNode;
  title: string;
  desc: string;
}) => {
  return (
    <div>
      <div className="bg-linear-to-r from-primary-600 to-primary-700 py-4 px-6 rounded-t-2xl ">
        <h3 className="flex items-center gap-2 text-white text-lg font-bold leading-7">
          {icon} {title}
        </h3>
        <p className="text-sm leading-5 text-primary-100">{desc}</p>
      </div>
    </div>
  );
};

export default InfoBanner;
