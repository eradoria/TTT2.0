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

export default function Home(props) {
  const [rankList, setRnakList] = useState([]);
  const [newRank, setNewRank] = useState();

  useEffect(() => {
    axios.get("http://localhost:3001/insert").then((response) => {
      setRnakList(response.data);
    });
  }, []);

  const handleListing = async (id) => {
    try {
      axios.put("http://localhost:3001/update", {
        id: id,
        newRank: newRank,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteListing = async (id) => {
    try {
      axios.delete(`http://localhost:3001/delete/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

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
                      onClick={() => deleteListing(x._id)}
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
