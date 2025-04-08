"use client";

import Animecard from "@/components/Animecard";
import SearchBar from "@/components/Searchbar";
import { searchAnime } from "@/api/mal";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const SearchAnime = () => {
  const [searchResults, setSearchResults] = useState([]);
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  useEffect(() => {
    const fetchResults = async () => {
      if (query?.trim()) {
        const results = await searchAnime({ query, limit: 10 });
        setSearchResults(results);
      } else {
        setSearchResults([]); // Clear results if query is empty
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="flex flex-col">
      <SearchBar />
      {query? searchResults?.length > 0 ? (
        <div className="flex gap-3 flex-wrap justify-center mx-auto py-10">
          {searchResults.map((anime, index) => (
            <Animecard key={index} anime={anime} />
          ))}
        </div>
      ) : (
        <p className="text-center p-10">No Results</p>
      ) : <p className="text-center p-10">Search your favorite Anime!</p>}
    </div>
  );
};

export default SearchAnime;
