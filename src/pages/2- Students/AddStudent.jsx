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
        <Button
          onClick={modalOpenerHandler}
          variant="outlined"
          size="medium"
          sx={{
            color: "black",
            borderColor: "white",
            marginRight: 4,
            marginBottom: 4,
          }}
        >
          <AddCircleOutlineIcon sx={{ marginRight: 1 }} />
          ADD NEW STUDENTS
        </Button>
      </div>
    </Fragment>
  );
};

export default AddUser;
