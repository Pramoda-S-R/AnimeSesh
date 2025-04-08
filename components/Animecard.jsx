import Link from "next/link";
import React from "react";

const Animecard = ({ anime }) => {
  return (
      <Link href={`/${anime.mal_id}`}>
        <div className="card w-64 h-96 bg-base-100 image-full shadow-sm">
          <figure>
            <img
              src={anime.images.jpg.image_url}
              alt={anime.mal_id}
              className="w-full h-full object-cover"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{anime.title_english || anime.title}</h2>
            <p>⭐ {anime.score} <br /> {anime.rating} <br /> {anime.episodes} eps <br /> {anime.year}</p>
            <div className="card-actions justify-end">
            </div>
          </div>
        </div>
      </Link>
  );
};

export default Animecard;
