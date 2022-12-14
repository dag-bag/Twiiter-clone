/** @format */

import React from "react";

function SideBarLink({ text, Icon, active }) {
  return (
    <div
      className={`text-[#d9d9d9]  hoverAnimation flex items-center justify-center xl:justify-start text-xl space-x-3 ${
        active && "font-bold"
      }`}
    >
      <Icon className="h-7" />
      <span className="hidden xl:inline text-white">{text}</span>
    </div>
  );
}

export default SideBarLink;
