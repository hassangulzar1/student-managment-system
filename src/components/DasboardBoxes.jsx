import React from "react";
import classes from "./DashboardBoxes.module.css";
import CountUp from "react-countup";
import { useNavigate } from "react-router-dom";
const DasboardBoxes = ({
  className,
  titleColor,
  title,
  count,
  Icon,
  spinnerColor,
}) => {
  const navigate = useNavigate();
  const styles = className;
  //! navigation
  const navigateHandler = (navigateTo) => {
    if (navigateTo == "Students") {
      navigate("/students");
    } else if (navigateTo == "Courses") {
      navigate("/courses");
    } else {
      navigate("/attendence");
    }
  };

  return (
    <div
      className={`${classes.box} ${classes[styles]}`}
      onClick={() => navigateHandler(title)}
    >
      <div style={{ marginLeft: "1rem", marginTop: "1.5rem" }}>
        {Icon}
        <p style={{ color: titleColor, marginTop: ".2rem" }}>{title}</p>
        <h5>
          {!count ? (
            <div
              className={`spinner-grow`}
              style={{ color: spinnerColor }}
              role="status"
            ></div>
          ) : (
            <CountUp end={count} duration={1}></CountUp>
          )}
        </h5>
      </div>
    </div>
  );
};

export default DasboardBoxes;
