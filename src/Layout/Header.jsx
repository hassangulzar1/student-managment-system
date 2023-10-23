import React from "react";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import { attendenceDataActions } from "../store/attendence-slice";
const Header = () => {
  const dispatch = useDispatch();
  return (
    <header style={{ display: "flex", justifyContent: "end" }}>
      <div
        className="d-flex justify-content-between my-1 mx-2"
        style={{ width: "80%" }}
      >
        <KeyboardBackspaceOutlinedIcon
          style={{ cursor: "pointer", margin: "auto 0" }}
        />
        <div>
          <TextField
            id="outlined-search"
            label="Search."
            type="search"
            onChange={(e) =>
              dispatch(attendenceDataActions.searchHandling(e.target.value))
            }
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
