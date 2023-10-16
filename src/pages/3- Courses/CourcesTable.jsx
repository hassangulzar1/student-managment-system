import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { db } from "../../config/firebase-config";
import { deleteDoc, doc } from "firebase/firestore";
import { studentDataActions } from "../../store/studentData-slice";
import { modalActions } from "../../store/modal-slice";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "black",
    color: "white",
    borderColor: "#F8F8F8",
    fontFamily: "Montserrat",
    fontWeight: "600",
  },
  [`&.${tableCellClasses.body}`]: {
    fontFamily: "Montserrat",
    fontWeight: "600",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const removeEditStyle = {
  color: "#FEAF00",
  cursor: "pointer",
  fontSize: "2rem",
  margin: "0 .5rem",
  "&:hover": {
    color: "black",
  },
};
const fallbackText = {
  color: "#ACACAC",
  textAlign: "center",
  fontSize: "1.5rem",
  marginTop: "2rem",
};

const UserTable = () => {
  //! Changing user table based on their current state
  const dispatch = useDispatch();
  //! Latest States Snaps
  const selectorData = useSelector((state) => state.studentsData.studentsData);
  const isLoading = useSelector((state) => state.studentsData.loadingState);
  //! Editing Handler
  const editingModeHandler = (id) => {
    dispatch(modalActions.editModal("Course"));
    dispatch(studentDataActions.editingData(id));
  };
  //! deleting user
  const deleteListHandler = async (Id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete the Course?"
    );
    if (confirm) {
      try {
        await deleteDoc(doc(db, "courses", Id));
        dispatch(studentDataActions.dataChanging());
        toast.success(`Course Removed Successfully`);
      } catch (error) {
        toast.error(err.message);
      }
    } else {
      return;
    }
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell align="right">Course Title</StyledTableCell>
            <StyledTableCell align="right">Course Code</StyledTableCell>
            <StyledTableCell align="right">Course Description</StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!isLoading &&
            selectorData.map((data, i) => (
              <StyledTableRow key={i + 1}>
                <StyledTableCell component="th" scope="row">
                  {i + 1}
                </StyledTableCell>
                <StyledTableCell align="right">{data.title}</StyledTableCell>
                <StyledTableCell align="right">{data.code}</StyledTableCell>
                <StyledTableCell align="right">{data.desc}</StyledTableCell>
                <StyledTableCell align="right">
                  <EditOutlinedIcon
                    sx={removeEditStyle}
                    onClick={() => editingModeHandler(data.id, i)}
                  />
                  <DeleteOutlineOutlinedIcon
                    sx={removeEditStyle}
                    onClick={() => {
                      deleteListHandler(data.id);
                    }}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
      {isLoading && <p style={fallbackText}>Data Fetching...</p>}
      {!isLoading && selectorData.length === 0 && (
        <p style={fallbackText}>No Data Found!</p>
      )}
    </TableContainer>
  );
};

export default UserTable;
