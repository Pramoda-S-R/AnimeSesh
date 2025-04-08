"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

const SearchIcon = () => {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e) => {
      const isMac = navigator.platform.toUpperCase().includes("MAC");
      const isShortcut =
        (isMac && e.metaKey && e.key === "k") ||
        (!isMac && e.ctrlKey && e.key === "k");

      if (isShortcut) {
        e.preventDefault();
        router.push("/search");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  return (
    <span className="flex items-center gap-2">
      <span className="hidden md:flex text-sm opacity-50">
        <kbd className="kbd kbd-sm">Ctrl</kbd> +{" "}
        <kbd className="kbd kbd-sm">K</kbd>
      </span>
      <Search className="text-2xl" />
    </span>
  );
};

export default SearchIcon;
