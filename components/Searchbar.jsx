"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchBar() {
  const inputRef = useRef(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  // Keyboard shortcut: Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      const isMac = navigator.platform.toUpperCase().includes("MAC");
      const isShortcut =
        (isMac && e.metaKey && e.key === "k") ||
        (!isMac && e.ctrlKey && e.key === "k");

      if (isShortcut) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Debounce the query to prevent spammy updates
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 1000);

    return () => clearTimeout(handler);
  }, [query]);

  // Update the URL when debounced query changes
  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedQuery.trim()) {
      params.set("q", debouncedQuery.trim());
    } else {
      params.delete("q");
    }

    router.push(`?${params.toString()}`, { scroll: false });
  }, [debouncedQuery, router]);

  return (
    <label className="input w-full max-w-md mx-auto">
      <svg
        className="h-[1em] opacity-50"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <g
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth="2.5"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </g>
      </svg>
      <input
        ref={inputRef}
        type="search"
        className="grow"
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <kbd className="kbd kbd-sm">Ctrl</kbd>
      <kbd className="kbd kbd-sm">K</kbd>
    </label>
  );
}
