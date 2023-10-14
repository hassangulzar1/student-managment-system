import React from "react";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import TextField from "@mui/material/TextField";

const Header = () => {
  return (
    <header>
      <div className="d-flex justify-content-between my-1 mx-2">
        <KeyboardBackspaceOutlinedIcon
          style={{ cursor: "pointer", margin: "auto 0" }}
        />
        <div>
          <TextField id="outlined-search" label="Search." type="search" />
        </div>
      </div>
    </header>
  );
};

export default Header;
