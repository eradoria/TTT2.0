import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import "../AddPlayer.css";

export default function AddPlayer() {
  const [id, setId] = useState();
  const [player, setPlayer] = useState("");
  const [rank, setRank] = useState();
  const [newRank, setNewRank] = useState();
  const [playerList, setPlayerList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(
          "https://ttt-backend-ht7uwdj12-eradoria.vercel.app/rankings"
        );
        const results = data
          .filter((player) => player.status === "")
          .map((player) => {
            return {
              key: player._id,
              value: player.player,
            };
          });
        setPlayerList([{ key: "", value: "" }, ...results]);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const handleListing = async () => {
    const status = "R";
    const win = "0";
    const loss = "0";

    try {
      await axios.post(
        "https://ttt-backend-942ms6cba-eradoria.vercel.app/insert",
        {
          player: player,
          rank: rank,
          status: status,
          win: win,
          loss: loss,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleReadded = async () => {
    const status = "R";

    try {
      axios.put("https://ttt-backend-942ms6cba-eradoria.vercel.app/readd", {
        id: id,
        newRank: newRank,
        status: status,
      });
      console.log("listing readded");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="addPlayer-container">
      <h1>Add New Player</h1>
      <div className="form">
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="standard-basic"
            label="Player"
            variant="standard"
            onChange={(event) => {
              setPlayer(event.target.value);
            }}
          />
          <TextField
            id="standard-basic"
            label="Rank"
            variant="standard"
            onChange={(event) => {
              setRank(event.target.value);
            }}
          />

          <Stack spacing={2} direction="row">
            <Button
              className="button"
              variant="contained"
              onClick={handleListing}
            >
              Save
            </Button>
          </Stack>
        </Box>
      </div>
      <h1>Or Previous Player</h1>
      <div className="form2">
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <select
            onChange={(event) => {
              setId(event.target.value);
            }}
          >
            {playerList.map((x) => {
              return (
                <option key={x.key} value={x.key}>
                  {x.value}
                </option>
              );
            })}
          </select>

          <TextField
            id="standard-basic"
            label="Rank"
            variant="standard"
            onChange={(event) => {
              setNewRank(event.target.value);
            }}
          />
        </Box>

        <Stack spacing={2} direction="row">
          <Button
            className="button"
            variant="contained"
            onClick={handleReadded}
          >
            Save
          </Button>
        </Stack>
      </div>
    </div>
  );
}
