import React from "react";

function SidebarOption({ text, Icon, active }: any) {
  return (
    <div className="flex items-center cursor-pointer rounded-3xl p-5 hover:bg-[#e8f5fe] hover:transition-all">
      <Icon />
      <h2 className="font-bold text-lg mr-5">{text}</h2>
    </div>
  );
}

export default SidebarOption;
