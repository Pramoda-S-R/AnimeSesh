import React from "react";
import Animecard from "@/components/Animecard";
import { getTopAnime } from "../api/mal";

const Home = async () => {
  const topAnime = await getTopAnime();
  return (
      <div className="flex gap-3 flex-wrap justify-center mx-auto">
        {topAnime.map((anime, index) => (
          <Animecard anime={anime} key={index} />
        ))}
    </div>
  );
};

export default Home;
