import React from "react";
import Link from "next/link";
import SearchIcon from "./SearchIcon";
import ProfileIcon from "./ProfileIcon";
import { getSeason } from "@/utils";
import Image from "next/image";

const imageMap = {
  Winter: "/winter-clothes.png",
  Spring: "/spring.png",
  Summer: "/sun.png",
  Fall: "/autumn.png",
};

const Navbar = () => {
  const season = getSeason(new Date());
  const imgSrc = imageMap[season];

  return (
    <nav className="flex justify-between items-center mb-10 bg-base-100 text-base-content relative">
      <Image
        src={imgSrc}
        alt={`${season} scene`}
        width={72}
        height={72}
        priority
        className="absolute z-0"
      />
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
