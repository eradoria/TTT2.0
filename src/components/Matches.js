import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import "../Matches.css";

const Matches = () => {
  // eslint-disable-next-line
  const [id, setId] = useState();
  // eslint-disable-next-line
  const [player, setPlayer] = useState("");
  const [win, setWin] = useState("0");
  const [loss, setLoss] = useState("0");
  const [playerList, setPlayerList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(
          "https://ttt-backend-ht7uwdj12-eradoria.vercel.app/rankings"
        );
        const results = data.map((player) => {
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

  const handleUpdate = async () => {
    try {
      await axios.put("http://localhost:3001/updateRecord", {
        id: id,
        win: win,
        loss: loss,
      });

      console.log("win/loss sent");
    } catch (error) {
      console.log("front end", error);
    }
  };

  return (
    <div className="matches-container">
      <h1>Player 1</h1>
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
            placeholder="Player.."
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

          <label>
            Won
            <select
              onChange={(event) => {
                setWin(event.target.value);
              }}
            >
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
            </select>
          </label>

          <label>
            Lost
            <select
              onChange={(event) => {
                setLoss(event.target.value);
              }}
            >
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
            </select>
          </label>
        </Box>

        <Stack spacing={2} direction="row">
          <Button className="button" variant="contained" onClick={handleUpdate}>
            Save
          </Button>
        </Stack>
      </div>
      {/* /////////////////////////////////////////////////////////////////////////////////////// */}
      <h1>Player 2</h1>
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

          <label>
            Won
            <select
              onChange={(event) => {
                setWin(event.target.value);
              }}
            >
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
            </select>
          </label>

          <label>
            Lost
            <select
              onChange={(event) => {
                setLoss(event.target.value);
              }}
            >
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
            </select>
          </label>
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
