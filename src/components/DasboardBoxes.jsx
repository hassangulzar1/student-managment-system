import React from "react";
import classes from "./DashboardBoxes.module.css";
import CountUp from "react-countup";

const DasboardBoxes = ({ className, titleColor, title, count, Icon }) => {
  const styles = className;
  return (
    <div className={`${classes.box} ${classes[styles]}`}>
      <div style={{ marginLeft: "1rem", marginTop: "1.5rem" }}>
        {Icon}
        <p style={{ color: titleColor, marginTop: ".2rem" }}>{title}</p>
        <h5>
          <CountUp end={count} duration={1}></CountUp>
        </h5>
      </div>
    </div>
  );
};

export default DasboardBoxes;
