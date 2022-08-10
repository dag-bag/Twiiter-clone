/** @format */

import Image from "next/image";
import React from "react";
import SideBarLink from "./SideBarLink";
import { HomeIcon } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import {
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  ClipboardListIcon,
  UserIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/outline";
const SideBarLinkData = [
  { text: "Home", Icon: HomeIcon, active: true },
  { text: "Explore", Icon: HashtagIcon },
  { text: "Notifications", Icon: BellIcon },
  { text: "Messages", Icon: InboxIcon },
  { text: "Bookmarks", Icon: BookmarkIcon },
  { text: "Lists", Icon: ClipboardListIcon },
  { text: "Profile", Icon: UserIcon },
  { text: "More", Icon: DotsCircleHorizontalIcon },
];
function Sidebar() {
  const { data: session } = useSession();
  return (
    <div className="hidden sm:flex flex-col items-center xl:items-start xl:w-[340px] fixed h-full">
      <div className="flex items-center justify-center w-14 h-14 hoverAnimation p-0 xl:ml-24">
        <Image src="https://rb.gy/ogau5a" width={30} height={30} alt="logo" />
      </div>
      <div className="space-y-2.5 mt-4 mb-2.5 xl:ml-24">
        {SideBarLinkData.map((item) => (
          <SideBarLink
            key={item.text}
            text={item.text}
            Icon={item.Icon}
            active={item.active}
          />
        ))}
      </div>
      <button className="hidden xl:inline ml-auto bg-[#1d9bf0] text-white rounded-full w-56 h-[52px] text-lg font-bold shadow-md hover:bg-[#1a8cd8]">
        Tweet
      </button>
      <div
        className="text-[#d9d9d9] flex items-center justify-center mt-auto hoverAnimation xl:ml-auto xl:mr-1.5 space-x-2"
        onClick={signOut}
      >
        <Image
          //   src={session.user.image}
          width={40}
          height={40}
          src={session?.user.image}
          alt=""
          className="h-10 w-10 rounded-full xl:mr-2.5"
        />
        <div className="hidden xl:inline leading-5">
          <h4 className="font-bold"> {session?.user.name}</h4>
          <p className="text-[#6e767d]">
            {/* @{session?.user.tag} */}@{session?.user.tag}
          </p>
        </div>
        <DotsHorizontalIcon className="h-5 hidden xl:inline ml-10" />
      </div>
    </div>
  );
}

export default Sidebar;
