import React, { Fragment } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import ModalInputs from "./ModalInputs";
import { useSelector, useDispatch } from "react-redux";
import { modalActions } from "../store/modal-slice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: 360, sm: 600 },
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  textAlign: "center",
  paddingBottom: "20px",
};

export default function TransitionsModal() {
  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.modal);

  const fadeOut = () => {
    dispatch(modalActions.closeModal());
  };
  return (
    <Fragment>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modalState.modalStatus}
        onClose={fadeOut}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={modalState.modalStatus}>
          <Box sx={style}>
            <Typography
              id="transition-modal-title"
              variant="h5"
              sx={{
                fontWeight: "bolder",
                fontFamily: "Montserrat",
                backgroundColor: "#FEAF00",
                color: "#FFFFFF",
                marginBottom: "30px",
                paddingY: 2,
              }}
              component="h2"
            >
              {modalState.modalFrom === "Student" && "ADD NEW STUDENTS"}
              {modalState.modalFrom === "Course" && "ADD NEW COURSES"}
              {modalState.modalFrom === "Attendence" && "Record Attendence"}
            </Typography>
            <ModalInputs />
          </Box>
        </Fade>
      </Modal>
    </Fragment>
  );
}
