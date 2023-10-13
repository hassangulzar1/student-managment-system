import React from "react";
import classes from "./DashboardBoxes.module.css";

const DasboardBoxes = ({ className, titleColor, title, count, icon }) => {
  const styles = className;
  return (
    <div className={`${classes.box} ${classes[styles]}`}>
      <div style={{ marginLeft: "1rem", marginTop: ".9rem" }}>
        <icon sx={{ fontSize: "3rem" }} />
        <p style={{ color: titleColor, marginTop: ".2rem" }}>{title}</p>
        <h5>{count}</h5>
      </div>
    </div>
  );
};

export default DasboardBoxes;
