import React from "react";
import AddStudent from "./AddStudent";
import Modal from "../../components/Modal";
import StudentTable from "./StudentsTable";
const Students = () => {
  return (
    <div style={{ backgroundColor: "#E5E5E5", height: "100vh" }}>
      <Modal />
      <AddStudent />
      <StudentTable />
    </div>
  );
};

export default Students;
