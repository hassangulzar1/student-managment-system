import React, { useEffect, useContext, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useSelector } from "react-redux";
const tableHead = {
  color: "#ACACAC",
  fontFamily: "Montserrat",
  fontWeight: "bold",
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
  const selectorData = useSelector((state) => state.studentsData.studentsData);
  return (
    <div style={{ margin: "0 .5rem" }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={tableHead}>No.</TableCell>
              <TableCell sx={tableHead}>Name</TableCell>
              <TableCell sx={tableHead}>Email</TableCell>
              <TableCell sx={tableHead}>Phone</TableCell>
              <TableCell sx={tableHead}>Date of Admission</TableCell>
              <TableCell sx={tableHead}>Gender</TableCell>
              <TableCell sx={tableHead}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ backgroundColor: "white" }}>
            {selectorData &&
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
                  <TableCell component="th" scope="row">
                    {i + 1}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {data.name}
                  </TableCell>
                  <TableCell>{data.email}</TableCell>
                  <TableCell>{data.phone}</TableCell>
                  <TableCell>{data.date}</TableCell>
                  <TableCell>{data.gender}</TableCell>
                  <TableCell>
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
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {!selectorData && <p style={fallbackText}>Data Fetching Loading...</p>}
      </TableContainer>
    </div>
  );
};

export default UserTable;
