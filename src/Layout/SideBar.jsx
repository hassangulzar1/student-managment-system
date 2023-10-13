import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import PersonIcon from "@mui/icons-material/Person";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import classes from "./SideBar.module.css";

const SideBar = () => {
  const navigate = useNavigate();

  return (
    <div
      className={`d-flex flex-column flex-shrink-0 p-3`}
      style={{
        width: "14rem",
        height: "100vh",
        backgroundColor: "#F2EAE1",
      }}
    >
      <h5
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: "bold",
          cursor: "pointer",
        }}
        onClick={() => navigate("/")}
      >
        Manage Students
      </h5>

      <ul
        className={`nav nav-pills flex-column mb-auto mt-5 ${classes["slide-bar"]}`}
      >
        <li className=" my-2 text-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
            end
          >
            <EqualizerIcon sx={{ marginRight: "5px" }} />
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li className="my-2 text-center mx-4">
          <NavLink
            to="/students"
            className={({ isActive }) =>
              isActive ? "nav-link active" : undefined
            }
          >
            <PersonIcon sx={{ marginRight: "19px" }} />
            <span>Students</span>
          </NavLink>
        </li>
        <li className="my-2 text-center mx-4">
          <NavLink
            to="/courses"
            className={({ isActive }) =>
              isActive ? "nav-link active" : undefined
            }
          >
            <LibraryBooksIcon sx={{ marginRight: "25px" }} />
            <span>Courses</span>
          </NavLink>
        </li>
        <li className="my-2 ms-4 text-center mx-4">
          <NavLink
            to="/attendence"
            className={({ isActive }) =>
              isActive ? "nav-link active" : undefined
            }
          >
            <CheckBoxIcon sx={{ marginRight: "5px" }} />
            <span>Attendance</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
