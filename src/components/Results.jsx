import React, { useContext } from "react";
import { UserContext } from './UserContext';

export default function Results({ element, artwork }) {
  const { name } = useContext(UserContext);

  return (
    <div>
      <p>
      <strong>{name}</strong>, you are: {element}
      </p>
      {artwork ? (
        <div className="artwork">
          <h2>{artwork.breeds[0].name}</h2>
          <img src={artwork.url} alt={artwork.breeds[0].temperament} />
          <p>{artwork.breeds[0].description}</p>
          <p><strong>Life span:</strong> {artwork.breeds[0].life_span}</p>
          <a href={artwork.breeds[0].wikipedia_url}>Wikipedia</a>
        </div>
      ) : (
        <p>No artwork found.</p>
      )}
    </div>
  );
}