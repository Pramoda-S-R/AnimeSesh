import React from "react";

const Episodes = ({ episodes }) => {
  return (
    <ul className="list bg-base-100 rounded-box shadow-md max-w-5xl mx-auto">
      {episodes.map((episode, index) => (
        <li key={index} className="list-row">
          <div className="text-4xl font-thin opacity-30 tabular-nums">
            {index + 1}
          </div>
          <div className="flex h-full items-center mt-1">
            <div>{episode.title}</div>
          </div>
          <div className="flex h-full items-center">
            {episode.filler && (
              <div className="badge badge-soft badge-warning">Filler</div>
            )}
            {episode.recap && (
              <div className="badge badge-soft badge-error">Recap</div>
            )}
          </div>
          <div className="flex h-full items-center">⭐ {episode.score} / 5</div>
        </li>
      ))}
    </ul>
  );
};

export default Episodes;
