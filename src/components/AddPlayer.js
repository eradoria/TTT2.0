import React, { useState } from "react";
import axios from "axios";
import "../AddPlayer.css";

export default function AddPlayer() {
  const [player, setPlayer] = useState("");
  const [rank, setRank] = useState();
  const [id, setId] = useState(0);

  // const counterId = () => {
  //   setId(id + 1);
  // };

  const handleListing = async () => {
    try {
      axios.post("http://localhost:3001/insert", {
        id: setId(id + 1),
        player: player,
        rank: rank,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {" "}
      <div className="form">
        <input
          type="text"
          name="Player"
          placeholder="Name"
          onChange={(event) => {
            setPlayer(event.target.value);
          }}
        />

        <input
          type="text"
          name="Rank"
          placeholder="Rank"
          onChange={(event) => {
            setRank(event.target.value);
          }}
        />

        <button className="add-button" onClick={handleListing}>
          Save
        </button>
      </div>
    </div>
  );
}
