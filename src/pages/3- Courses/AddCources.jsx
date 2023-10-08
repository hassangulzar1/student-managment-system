import React, { Fragment, useContext } from "react";
import { Button } from "@mui/material";
import classes from "./AddCources.module.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import authContext from "../../Context/auth-context";
const AddUser = () => {
  const ctx = useContext(authContext);

  const modalOpenerHandler = () => {
    ctx.modalStateHandler(true, true);
  };

  return (
    //! Add Button
    <Fragment>
      {/* Add user Button  */}
      <div className={classes.mainDiv}>
        <Button
          onClick={modalOpenerHandler}
          variant="outlined"
          size="medium"
          sx={{
            color: "white",
            borderColor: "white",
            marginRight: 4,
            marginBottom: 4,
          }}
        >
          <AddCircleOutlineIcon sx={{ marginRight: 1 }} />
          ADD NEW COURSE
        </Button>
      </div>
    </Fragment>
  );
};

export default AddUser;
