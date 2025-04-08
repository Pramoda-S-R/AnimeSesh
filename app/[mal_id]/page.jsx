import { getAnimeByID } from "@/api/mal";
import React from "react";

export default async function Page({ params }) {
  const { mal_id } = await params;
  const anime = await getAnimeByID({ id: mal_id });
  return (
    <div className="flex">
      <img
        src={anime.images.jpg.image_url}
        alt={anime.mal_id}
        className="w-56"
      />
      <div>
        <h2 className="text-3xl font-extrabold">
          {anime.title_english || anime.title}
        </h2>
        <p className="font-extralight text-sm">{anime.rating}</p>
        <p className="font-extralight text-sm">{anime.synopsis}</p>
        <p className="font-bold text-orange-300">Score: {anime.score}/10</p>
      </div>
    </div>
  );
}
