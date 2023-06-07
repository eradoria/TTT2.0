import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import "../Player.css";

export default function Player() {
  const { id } = useParams();

  const [playerRecord, setPlayerRecord] = useState([]);

  useEffect(() => {
    axios
      .get("https://ttt-backend-ht7uwdj12-eradoria.vercel.app/rankings")
      .then((response) => {
        setPlayerRecord(response.data);
        console.log(response.data);
      });
  }, []);

  return (
    <div>
      {playerRecord
        .filter((x) => x._id === id)
        .map((x) => {
          return (
            <div className="player-record">
              <h2>{x.player}</h2>
              <div className="record">
                <div className="win">
                  <h7>Win</h7>
                  <h2>{x.win}</h2>
                </div>
                <div className="loss">
                  <h7>Loss</h7>
                  <h2>{x.loss}</h2>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
