import { getAnimeByID, getAnimeEpisodes } from "@/api/mal";
import AnimeDesc from "@/components/AnimeDesc";
import Episodes from "@/components/Episodes";
import React from "react";

export default async function Page({ params }) {
  const { mal_id } = await params;
  const anime = await getAnimeByID({ id: mal_id });
  const episodes = await getAnimeEpisodes({ id: mal_id });
  return (
    <div>
      <AnimeDesc anime={anime} />
      <Episodes episodes={episodes} />
    </div>
  );
}
