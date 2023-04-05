import React, { useState, useEffect } from "react";

export default function matches() {
  const [id, setId] = useState();
  const [player, setPlayer] = useState("");
  const [playerList, setPlayerList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // Fetch data
      const { data } = await axios.get(
        "https://ttt-backend-ht7uwdj12-eradoria.vercel.app/rankings"
      );
      const results = [];
      // Store results in the results array
      data.forEach((value) => {
        results.push({
          key: value._id,
          value: value.player,
        });
      });
      // Update the options state
      setPlayerList([{ key: "", value: "" }, ...results]);
    }
    // console.log(playerList);

    // Trigger the fetch
    fetchData();
  }, []);

  return (
    <div className="matches-container">
      <div className="match1-container"></div>
      <div className="match2-container"></div>
    </div>
  );
}
