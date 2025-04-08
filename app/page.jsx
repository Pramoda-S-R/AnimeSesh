import React from "react";
import Animecard from "@/components/Animecard";
import { getTopAnime } from "../api/mal";
import SearchBar from "@/components/Searchbar";

const Home = async () => {
  const topAnime = await getTopAnime();
  return (
      <div className="flex gap-3 flex-wrap w-full p-3">
        {topAnime.map((anime, index) => (
          <Animecard anime={anime} key={index} />
        ))}
    </div>
  );
};

export default Home;
