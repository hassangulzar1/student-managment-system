import React from "react";
import classes from "./DashboardBoxes.module.css";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
const DasboardBoxes = (props) => {
  return (
    <div className={`${classes.box} ${classes.studentBox}`}>
      <div style={{ marginLeft: "1rem", marginTop: ".9rem" }}>
        <SchoolOutlinedIcon sx={{ fontSize: "3rem" }} />
        <p
          className={classes.student}
          style={{ color: props.color, marginTop: ".2rem" }}
        >
          {/* {props.title} */}
          Students
        </p>
        <h5>243</h5>
      </div>
    </div>
  );
};

export default DasboardBoxes;
