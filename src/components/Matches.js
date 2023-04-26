import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const Matches = () => {
  const [id, setId] = useState();
  // eslint-disable-next-line 
  const [player, setPlayer] = useState("");
  const [playerList, setPlayerList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(
          "https://ttt-backend-ht7uwdj12-eradoria.vercel.app/rankings"
        );
        const results = data
          .filter((player) => player.status === "R")
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

  return (
    <div className="matches-container">
      <div className="match1-container">
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

          <TextField id="standard-basic" label="Rank" variant="standard" />
        </Box>

        <Stack spacing={2} direction="row">
          <Button className="button" variant="contained">
            Save
          </Button>
        </Stack>
      </div>
      <div className="match2-container">
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

          <TextField id="standard-basic" label="Rank" variant="standard" />
        </Box>

        <Stack spacing={2} direction="row">
          <Button className="button" variant="contained">
            Save
          </Button>
        </Stack>
      </div>
    </div>
  );
};

export default Matches;
