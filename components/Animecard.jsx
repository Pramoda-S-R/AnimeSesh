import Link from "next/link";
import React from "react";

const Animecard = ({ anime }) => {
  return (
    <div className="w-44 relative">
      <Link href={`/${anime.mal_id}`}>
        <div className="h-full">
          <img
            src={anime.images.jpg.image_url}
            alt={anime.mal_id}
            className="rounded-lg z-0"
          />
        </div>
        <div className="absolute bottom-0 left-0 z-10  p-2">
          <p className="text-white font-extrabold">
            {anime.title_english || anime.title} ⭐{anime.score}
          </p>
          <p>{anime.rating}</p>
          <p>{anime.episodes} eps</p>
        </div>
      </Link>
    </div>
  );
};

export default Animecard;
