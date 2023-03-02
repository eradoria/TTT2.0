import React, { useState } from "react";
import axios from "axios";

import TextField from "@mui/material/TextField";

export default function AddPlayer() {
  const [player, setPlayer] = useState("");
  const [rank, setRank] = useState();

  // const handleListing = () => {
  //   Axios.post("https://localhost:3001/insert", {
  //     player: player,
  //     rank: rank,
  //   });
  // };

  const handleListing = async () => {
    try {
      // const res = await axios.post("http://localhost:3001/insert");
      axios.post("https://localhost:3001/insert", {
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
