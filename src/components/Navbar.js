import React from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import "../Navbar.css";
import { checkAuth } from "../App";

const Navigation = (props) => {
  return (
    <>
      <AppBar position="relative">
        <Toolbar>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: "1" }}>
            Tyler Table Tennis
          </Typography>
          <ul className="nav-list">
            <li className="nav-list-item">
              <Link to="/">Rankings</Link>
            </li>
            <li className="nav-list-item">
              <Link to="/addplayer">Add Player</Link>
            </li>
            <li className="nav-list-item">
              <Link to="/login">{checkAuth ? "Log Out" : "Login"}</Link>
            </li>
          </ul>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navigation;
