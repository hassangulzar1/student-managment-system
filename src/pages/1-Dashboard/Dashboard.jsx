import React from "react";
import DashboardBoxes from "../../components/DasboardBoxes";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
const Dashboard = () => {
  return (
    <div className="d-flex justify-content-center">
      <DashboardBoxes
        className="studentBox"
        titleColor="black"
        title="Students"
        count={12}
        Icon={
          <SchoolOutlinedIcon sx={{ fontSize: "3rem", color: "#74c1ed" }} />
        }
      />
      <DashboardBoxes
        className="coursesBox"
        titleColor="black"
        title="Courses"
        count={234}
        Icon={
          <BookmarkBorderOutlinedIcon
            sx={{ fontSize: "3rem", color: "#ee95c5" }}
          />
        }
      />
      <DashboardBoxes
        className="attendeceBox"
        titleColor="white"
        title="Attendence"
        count={12}
        Icon={
          <PersonOutlineOutlinedIcon
            sx={{ fontSize: "3rem", color: "white" }}
          />
        }
      />
    </div>
  );
};

export default Dashboard;
