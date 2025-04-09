import React from "react";
import { capitalize } from "@/utils";

const AnimeDesc = ({ anime }) => {
  return (
    <div className="flex sm:flex-row flex-col gap-5 mx-auto px-10 sm:items-start items-center mb-10">
      <img
        src={anime.images.jpg.image_url}
        alt={anime.mal_id}
        className="w-64 h-96 rounded-lg"
      />
      <div className="flex flex-col gap-5 max-w-5xl">
        <h2 className="text-3xl font-extrabold">
          {anime.title_english || anime.title}
        </h2>
        <p className="font-extralight text-sm">{anime.rating}</p>
        <div className="font-extralight text-sm">{anime.genres.map((genre)=>(<div key={genre.mal_id} className="badge badge-soft badge-info mr-2">{genre.name}</div>))}</div>
        <p className="font-extralight text-sm">
          {capitalize(anime.season)} {anime.year}
        </p>
        <p className="font-extralight text-sm">{anime.synopsis}</p>
        <p className="font-bold text-orange-300">Score: ⭐ {anime.score}</p>
      </div>
    </div>
  );
};

export default AnimeDesc;
