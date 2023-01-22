import React, { useState } from "react";
import axios from "axios";
import Location from "./LocationSearch";

function ArtistSearch({ token }) {
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);

  const searchArtists = async (e) => {
    e.preventDefault();
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: searchKey,
        type: "artist",
      },
    });
    console.log(data);

    setArtists(data.artists.items);
  };

  const renderArtists = () => {
    return artists.map((artist) => (
      <div key={artist.id}>
        {artist.images.length ? (
          <img width={"300px"} src={artist.images[0].url} alt="" />
        ) : (
          <div>No Image</div>
        )}
        {artist.name}
      </div>
    ));
  };

  return (
    <div className="artist-search">
      <form onSubmit={searchArtists}>
        <input
          type="text"
          onChange={(e) => setSearchKey(e.target.value)}
        ></input>
        <button type={"submit"}>Search</button>
      </form>
      {renderArtists()}
      
      <Location />
    </div>
  );

}

export default ArtistSearch;
