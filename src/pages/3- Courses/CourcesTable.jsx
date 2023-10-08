import React, { useEffect, useContext, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Container } from "@mui/material";
import authContext from "../../Context/auth-context";

const UserTable = () => {
  const ctx = useContext(authContext);

  const [dataState, setDataState] = useState([]);
  //! Changing user table based on their current state
  useEffect(() => {
    setDataState(ctx.courcesData);
  }, [ctx.courcesData]);

  return (
    <Container>
      <TableContainer>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Course Title</TableCell>
              <TableCell>Course Code</TableCell>
              <TableCell>Course Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataState.map((data, i) => (
              <TableRow
                key={data.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {i + 1}
                </TableCell>
                <TableCell component="th" scope="row">
                  {data.courseTitle}
                </TableCell>
                <TableCell>{data.courseCode}</TableCell>
                <TableCell>{data.courseDesc}</TableCell>
                <TableCell>
                  <ButtonGroup variant="contained">
                    <Button
                      sx={{ background: "green" }}
                      onClick={() => ctx.editingModeHandler(data.id, i, true)}
                    >
                      <EditIcon />
                    </Button>
                    <Button
                      sx={{ background: "red" }}
                      onClick={() => {
                        ctx.deleteListHandler(data.id);
                      }}
                    >
                      <DeleteForeverIcon />
                    </Button>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default UserTable;
