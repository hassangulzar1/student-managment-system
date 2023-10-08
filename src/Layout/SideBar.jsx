import React from "react";
import { NavLink } from "react-router-dom";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import PersonIcon from "@mui/icons-material/Person";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
const SideBar = () => {
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
      style={{ width: "300px", height: "100vh" }}
    >
      <NavLink
        to="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        end
      >
        <span className="fs-4 text-center">Student Management System</span>
      </NavLink>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item my-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link text-white"
            }
            end
          >
            <EqualizerIcon sx={{ margin: "0px 2px" }} />
            Dashboard
          </NavLink>
        </li>
        <li className="my-2">
          <NavLink
            to="/students"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link text-white"
            }
          >
            <PersonIcon sx={{ margin: "0px 2px" }} />
            Students
          </NavLink>
        </li>
        <li className="my-2">
          <NavLink
            to="/courses"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link text-white"
            }
          >
            <LibraryBooksIcon sx={{ margin: "0px 2px" }} />
            Courses
          </NavLink>
        </li>
        <li className="my-2">
          <NavLink
            to="/attendence"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link text-white"
            }
          >
            <CheckBoxIcon sx={{ margin: "0px 2px" }} />
            Attendance
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
