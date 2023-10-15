import React from "react";
import AddStudent from "./AddStudent";
import Modal from "../../components/Modal";
import StudentTable from "./StudentsTable";
const Students = () => {
  return (
    <div style={{ backgroundColor: "#f5f5f5", height: "90vh" }}>
      <Modal />
      <AddStudent />
      <StudentTable />
    </div>
  );
};

export default Students;
