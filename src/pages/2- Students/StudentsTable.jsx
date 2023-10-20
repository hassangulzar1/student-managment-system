import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../store/modal-slice";
import { studentDataActions } from "../../store/studentData-slice";
import { toast } from "react-toastify";
import { db } from "../../config/firebase-config";
import { deleteDoc, doc, setDoc } from "firebase/firestore";

const tableHead = {
  color: "#ACACAC",
  fontFamily: "Montserrat",
  fontWeight: "bold",
};
const tableCell = {
  fontFamily: "Montserrat",
  fontWeight: "600",
};
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
  marginTop: "4rem",
};

const UserTable = () => {
  const dispatch = useDispatch();
  const options = { year: "numeric", month: "long", day: "numeric" };
  //! Latest States Snaps
  const selectorData = useSelector((state) => state.studentsData.studentsData);
  const attendenceData = useSelector(
    (state) => state.attendence.attendenceData
  );
  const isLoading = useSelector((state) => state.studentsData.loadingState);
  //! Editing Handler
  const editingModeHandler = (id) => {
    dispatch(modalActions.editModal("Student"));
    dispatch(studentDataActions.editingData(id));
  };
  //! deleting user
  const deleteListHandle = async (Id) => {
    const confirm = window.confirm("Are you sure you want to delete the User?");

    if (confirm) {
      try {
        attendenceData.map(async (e) => {
          if (e.studentId === Id) {
            await deleteDoc(doc(db, "attendence", e.id));
          }
        });
        await deleteDoc(doc(db, "students", Id));

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
    <div style={{ margin: "0 .5rem" }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={tableHead}></TableCell>
              <TableCell sx={tableHead}>Name</TableCell>
              <TableCell sx={tableHead}>Email</TableCell>
              <TableCell sx={tableHead}>Phone</TableCell>
              <TableCell sx={tableHead}>Date of Admission</TableCell>
              <TableCell sx={tableHead}>Gender</TableCell>
              <TableCell sx={tableHead}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ backgroundColor: "white" }}>
            {!isLoading &&
              selectorData.map((data, i) => (
                <TableRow
                  key={data.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:hover": {
                      background:
                        " linear-gradient(90deg, rgba(254,175,0,1) 0%, rgba(252,220,148,1) 59%)",
                    },
                  }}
                >
                  <TableCell component="th" scope="row" sx={tableCell}>
                    {i + 1}
                  </TableCell>
                  <TableCell sx={tableCell}>{data.name}</TableCell>
                  <TableCell sx={tableCell}>{data.email}</TableCell>
                  <TableCell sx={tableCell}>{data.phone}</TableCell>
                  <TableCell sx={tableCell}>
                    {new Date(data.date).toLocaleDateString("en-US", options)}
                  </TableCell>
                  <TableCell sx={tableCell}>{data.gender}</TableCell>
                  <TableCell>
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
        {!isLoading && selectorData.length === 0 && (
          <p style={fallbackText}>No Data Found!</p>
        )}
      </TableContainer>
    </div>
  );
};

export default UserTable;
