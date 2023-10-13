import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ShowChartOutlinedIcon from "@mui/icons-material/ShowChartOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <img src="" style={{ borderRadius: "50%" }} alt="Avatar" />
        <h5>Name of Admin</h5>
        <h4>Admin</h4>
      </div>
      <ul
        className={`nav nav-pills flex-column mb-auto mt-5 ${classes["slide-bar"]}`}
      >
        <li className="my-3 text-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
            end
          >
            <ShowChartOutlinedIcon sx={{ marginRight: "5px" }} />
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li className="my-3 text-center ">
          <NavLink
            to="/students"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            <SchoolOutlinedIcon sx={{ marginRight: "19px" }} />
            <span>Students</span>
          </NavLink>
        </li>
        <li className="my-3 text-center ">
          <NavLink
            to="/courses"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            <BookmarkBorderIcon sx={{ marginRight: "25px" }} />
            <span>Courses</span>
          </NavLink>
        </li>
        <li className="my-3 ms-2 text-center">
          <NavLink
            to="/attendence"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            <CheckBoxOutlinedIcon sx={{ marginRight: "5px" }} />
            <span>Attendance</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
