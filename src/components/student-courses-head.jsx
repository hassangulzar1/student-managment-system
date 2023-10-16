import React from "react";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { modalActions } from "../store/modal-slice";

const StudentCoursesHead = (props) => {
  const dispatch = useDispatch();

  const modalOpenerHandler = () => {
    dispatch(modalActions.openModal(props.modal));
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2
          style={{
            marginTop: ".4rem",
            fontFamily: "Montserrat",
            fontWeight: "bold",
            marginLeft: 4,
          }}
        >
          {props.title}
        </h2>
        <Button
          onClick={modalOpenerHandler}
          size="medium"
          sx={{
            color: "black",
            marginTop: ".4rem",
            backgroundColor: "#FEAF00",
            paddingX: "1rem",
            fontFamily: "Montserrat",
            color: "#FFFFFF",
            marginRight: 4,
            "&:hover": {
              background:
                "linear-gradient(90deg, rgba(254,175,0,1) 0%, rgba(252,220,148,1) 100%)",
            },
          }}
        >
          {props.buttonName}
        </Button>
      </div>
      <hr style={{ margin: ".9rem .9rem", color: "#ACACAC" }} />
    </>
  );
};

export default StudentCoursesHead;
