import React from "react";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";

const Header = () => {
  return (
    <header>
      <div className="d-flex justify-content-between my-2 mx-2">
        <KeyboardBackspaceOutlinedIcon style={{ cursor: "pointer" }} />
        <div>
          <TextField
            id="outlined-search"
            label="Search."
            type="search"
            endAdornment={
              <InputAdornment position="end">
                <IconButton aria-label="toggle password visibility" edge="end">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
