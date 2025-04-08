import React from "react";
import Link from "next/link";
import SearchIcon from "./SearchIcon";
import ProfileIcon from "./ProfileIcon";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center mb-10 bg-base-100 text-base-content relative">
      <div className="w-18 h-18 bg-sky-200 absolute z-0 flex flex-col justify-end">
        <div className="w-full h-1 bg-white" />
        <div className="w-full h-2 bg-cyan-300" />
        <div className="w-full h-1 bg-yellow-400" />
        <div className="w-full h-2 bg-yellow-500" />
      </div>
      <ul className="flex items-center justify-between w-full p-4 z-10">
        <Link href={"/"} className="text-4xl font-bold">
          AnimeSesh
        </Link>
        <div className="flex items-center gap-4">
          <Link href={"/search"}>
            <SearchIcon />
          </Link>
          <ProfileIcon />
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
