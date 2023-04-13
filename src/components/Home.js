import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { Link } from "react-router-dom";
import { checkAuth } from "../App";
import Button from "@mui/material/Button";
import "../Home.css";

export default function Home() {
  const [rankList, setRankList] = useState([]);
  const [newRank, setNewRank] = useState();
  const [newStatus, setNewStatus] = useState();

  // useEffect(() => {
  //   axios.get("http://localhost:3001/rankings").then((response) => {
  //     setRankList(response.data);
  //   });
  // }, []);
  useEffect(() => {
    axios
      .get("https://ttt-backend-ht7uwdj12-eradoria.vercel.app/rankings")
      .then((response) => {
        setRankList(response.data);
        console.log(response.data);
      });
  }, []);

  const handleListing = async (id) => {
    try {
      axios.put("https://ttt-backend-ht7uwdj12-eradoria.vercel.app/update", {
        id: id,
        newRank: newRank,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removeListing = async (id) => {
    try {
      const newStatus = "NR";
      await axios.put("http://localhost:3001/remove", {
        id: id,
        newStatus: newStatus,
      });
      console.log("Listing removed successfully");
    } catch (error) {
      console.log(error);
    }
  };

  // const removeListing = async (id) => {
  //   try {
  //     axios.put("https://ttt-backend-ht7uwdj12-eradoria.vercel.app/remove", {
  //       id: id,
  //       newStatus: newStatus,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Player</TableCell>
            <TableCell>Rank</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rankList
            .filter((player) => player.status.includes("R"))
            .sort((a, b) => a.rank - b.rank)
            .map((x, idx) => (
              <TableRow key={x._id}>
                <TableCell>
                  {" "}
                  <Link to={`/Player/${x._id}`}>{x.player}</Link>
                </TableCell>
                <TableCell>{x.rank}</TableCell>
                {checkAuth() ? (
                  <TableCell>
                    <DeleteIcon
                      // add onClick method here
                      onClick={() => removeListing(x._id)}
                      className="delete-icon"
                    />
                    <div className="update-input">
                      <input
                        type="text"
                        name="Player"
                        placeholder="New Rank"
                        onChange={(event) => {
                          setNewRank(event.target.value);
                        }}
                      />
                      <Button
                        className="button"
                        variant="contained"
                        onClick={() => handleListing(x._id)}
                      >
                        Update
                      </Button>
                    </div>
                  </TableCell>
                ) : null}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
