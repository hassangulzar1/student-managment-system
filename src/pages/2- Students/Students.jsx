import React from "react";
import AddStudent from "./AddStudent";
import Modal from "../../components/Modal";
import StudentTable from "./StudentsTable";
const Students = () => {
  return (
    <>
      <Modal />
      <AddStudent />
      <StudentTable />
    </>
  );
};

export default Students;
