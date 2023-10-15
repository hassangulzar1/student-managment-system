import React, { Fragment, useContext } from "react";
import { Button } from "@mui/material";
import classes from "./AddStudent.module.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import authContext from "../../Context/auth-context";
const AddUser = () => {
  const ctx = useContext(authContext);
  const modalOpenerHandler = () => {
    ctx.modalStateHandler(true, false);
  };

  return (
    //! Add Button
    <Fragment>
      <div className={classes.mainDiv}>
        <h2
          style={{
            marginTop: ".4rem",
            fontFamily: "Montserrat",
            fontWeight: "bold",
            marginLeft: 4,
          }}
        >
          Students List
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
          ADD NEW STUDENTS
        </Button>
      </div>
      <hr style={{ margin: ".9rem .9rem", color: "#E5E5E5" }} />
    </Fragment>
  );
};

export default AddUser;
