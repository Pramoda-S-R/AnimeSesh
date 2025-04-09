import Link from "next/link";
import React from "react";

const Animecard = ({ anime }) => {
  return (
    <Link href={`/${anime.mal_id}`}>
      <div className="w-64 h-96 bg-base-100 rounded-lg shadow-sm relative">
        <img
          src={anime.images.jpg.image_url}
          alt={anime.mal_id}
          className="w-full h-full object-cover rounded-lg"
        />
        <div className="absolute top-0 p-3 bg-gradient-to-b from-black/50 to-black/0 w-full">
          <h2 className="flex items-center gap-2 font-bold text-xl">
            {anime.title_english || anime.title}
          </h2>
          <p>
            ⭐ {anime.score} <br /> {anime.rating} <br /> {anime.episodes} eps{" "}
            <br /> {anime.year}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Animecard;
