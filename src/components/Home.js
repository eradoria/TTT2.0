import React, { useEffect, useState } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import {Link} from "react-router-dom"
import { checkAuth } from "../App";

export default function Home(props) {
  const [rankList, setRnakList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/insert").then((response) => {
      setRnakList(response.data);
    });
  }, []);

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
          {rankList.sort((a, b) => a.rank - b.rank).map((x, idx) => (
            <TableRow key={x.id}>
              <TableCell > <Link to={`/Listings/${x.id}`}>{x.player}</Link></TableCell>
              <TableCell>{x.rank}</TableCell>
              {checkAuth() ? (
              <TableCell>
                <DeleteIcon
                  // add onClick method here
                  // onClick={}
                  className="icon text-red"
                />
              </TableCell>
              ) : null}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
