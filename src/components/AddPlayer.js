import React, { useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import "../AddPlayer.css";

export default function AddPlayer() {
  const [player, setPlayer] = useState("");
  const [rank, setRank] = useState();

  // const counterId = () => {
  //   setId(id + 1);
  // };

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

  return (
    <div>
      {" "}
      <div className="form">
        {/* <input
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
        /> */}
        {/* 
        <button className="add-button" onClick={handleListing}>
          Save
        </button> */}

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
        </Box>

        <Stack spacing={2} direction="row">
          <Button
            className="button"
            variant="contained"
            onClick={handleListing}
          >
            Save
          </Button>
        </Stack>
      </div>
    </div>
  );
}
