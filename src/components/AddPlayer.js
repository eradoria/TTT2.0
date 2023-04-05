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

  const handleListing = async () => {
    try {
      axios.post("https://ttt-backend-ht7uwdj12-eradoria.vercel.app/insert", {
        player: player,
        rank: rank,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleReadded = async () => {
    try {
      axios.put("https://ttt-backend-ht7uwdj12-eradoria.vercel.app/update", {
        // axios.put("http://localhost:3001/readd", {
        id: id,
        newRank: newRank,
      });
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
