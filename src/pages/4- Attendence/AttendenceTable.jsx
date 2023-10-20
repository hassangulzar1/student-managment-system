import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { studentDataActions } from "../../store/studentData-slice";
import { modalActions } from "../../store/modal-slice";
import { toast } from "react-toastify";
import { db } from "../../config/firebase-config";
import { deleteDoc, doc } from "firebase/firestore";
import { useDispatch } from "react-redux";

//! Styles
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

const tableHead = {
  color: "#ACACAC",
  fontFamily: "Montserrat",
  fontWeight: "bold",
};

const tableCell = {
  fontFamily: "Montserrat",
  fontWeight: "600",
};
const AttendenceTable = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.studentsData.loadingState);
  const studentsArray = useSelector((state) => state.attendence.studentsData);
  const coursesArray = useSelector((state) => state.attendence.coursesData);
  const studentsIds = studentsArray.map((id) => id.id);
  const coursesIds = coursesArray.map((id) => id.id);
  const options = { year: "numeric", month: "long", day: "numeric" };

  const attendenceData = useSelector(
    (state) => state.attendence.attendenceData
  );
  //! Editing Handler
  const editingModeHandler = (id) => {
    dispatch(modalActions.editModal("Attendence"));
    dispatch(studentDataActions.editingData(id));
  };
  //! deleting user
  const deleteListHandle = async (Id) => {
    const confirm = window.confirm("Are you sure you want to delete the User?");
    if (confirm) {
      try {
        await deleteDoc(doc(db, "attendence", Id));
        dispatch(studentDataActions.dataChanging());
        toast.success(`Student Removed Successfully`);
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      return;
    }
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead sx={{ backgroundColor: "#F8F8F8" }}>
          <TableRow>
            <TableCell sx={tableHead}>Student (Name)</TableCell>
            <TableCell sx={tableHead} align="right">
              Course (Name)
            </TableCell>
            <TableCell sx={tableHead} align="right">
              Attendence (DATE)
            </TableCell>
            <TableCell sx={tableHead} align="right">
              Status
            </TableCell>
            <TableCell sx={tableHead} align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!isLoading &&
            attendenceData.map((data, i) => (
              <TableRow
                key={data.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" sx={tableCell}>
                  {studentsArray[studentsIds.indexOf(data.studentId)].name}
                </TableCell>
                <TableCell align="right" sx={tableCell}>
                  {coursesArray[coursesIds.indexOf(data.courseId)].title}
                </TableCell>
                <TableCell align="right" sx={tableCell}>
                  {new Date(data.date).toLocaleDateString("en-US", options)}
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: "Montserrat",
                    fontWeight: "600",
                    color: data.status === "present" ? "green" : "red",
                  }}
                  align="right"
                >
                  {data.status}
                </TableCell>
                <TableCell align="right">
                  <EditOutlinedIcon
                    sx={removeEditStyle}
                    onClick={() => editingModeHandler(data.id, i)}
                  />
                  <DeleteOutlineOutlinedIcon
                    sx={removeEditStyle}
                    onClick={() => {
                      deleteListHandle(data.id);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {isLoading && <p style={fallbackText}>Data Fetching...</p>}
    </TableContainer>
  );
};

export default AttendenceTable;
