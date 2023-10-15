import React, { useEffect, useContext, useState } from "react";
import authContext from "../../Context/auth-context";
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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
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

const UserTable = () => {
  const ctx = useContext(authContext);

  const [dataState, setDataState] = useState([]);
  //! Changing user table based on their current state
  useEffect(() => {
    setDataState(ctx.courcesData);
  }, [ctx.courcesData]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>No</StyledTableCell>
            <StyledTableCell align="right">Course Title</StyledTableCell>
            <StyledTableCell align="right">Course Code</StyledTableCell>
            <StyledTableCell align="right">Course Description</StyledTableCell>
            <StyledTableCell align="right">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataState.map((data, i) => (
            <StyledTableRow key={i + 1}>
              <StyledTableCell component="th" scope="row">
                {i + 1}
              </StyledTableCell>
              <StyledTableCell align="right">
                {data.courseTitle}
              </StyledTableCell>
              <StyledTableCell align="right">{data.courseCode}</StyledTableCell>
              <StyledTableCell align="right">{data.courseDesc}</StyledTableCell>
              <StyledTableCell align="right">
                <EditOutlinedIcon
                  sx={removeEditStyle}
                  onClick={() => ctx.editingModeHandler(data.id, i)}
                />
                <DeleteOutlineOutlinedIcon
                  sx={removeEditStyle}
                  onClick={() => {
                    ctx.deleteListHandler(data.id);
                  }}
                />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
  // return (

  //   <Container>
  //     <TableContainer>
  //       <Table sx={{ minWidth: 650 }}>
  //         <TableHead>
  //           <TableRow>
  //             <TableCell>No.</TableCell>
  //             <TableCell>Course Title</TableCell>
  //             <TableCell>Course Code</TableCell>
  //             <TableCell>Course Description</TableCell>
  //           </TableRow>
  //         </TableHead>
  //         <TableBody>
  //           {dataState.map((data, i) => (
  //             <TableRow
  //               key={data.id}
  //               sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
  //             >
  //               <TableCell component="th" scope="row">
  //                 {i + 1}
  //               </TableCell>
  //               <TableCell component="th" scope="row">
  //                 {data.courseTitle}
  //               </TableCell>
  //               <TableCell>{data.courseCode}</TableCell>
  //               <TableCell>{data.courseDesc}</TableCell>
  //               <TableCell>
  //                 <ButtonGroup variant="contained">
  //                   <Button
  //                     sx={{ background: "green" }}
  //                     onClick={() => ctx.editingModeHandler(data.id, i, true)}
  //                   >
  //                     <EditIcon />
  //                   </Button>
  //                   <Button
  //                     sx={{ background: "red" }}
  //                     onClick={() => {
  //                       ctx.deleteListHandler(data.id);
  //                     }}
  //                   >
  //                     <DeleteForeverIcon />
  //                   </Button>
  //                 </ButtonGroup>
  //               </TableCell>
  //             </TableRow>
  //           ))}
  //         </TableBody>
  //       </Table>
  //     </TableContainer>
  //   </Container>
  // );
};

export default UserTable;
