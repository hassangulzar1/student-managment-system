import React from "react";
import AddStudent from "./AddStudent";
import Modal from "../../components/Modal";
import StudentTable from "./StudentsTable";
const Students = () => {
  const modalData = (data) => {
    console.log(data);
  };

  return (
    <div style={{ backgroundColor: "#F8F8F8", height: "90vh" }}>
      <Modal data={modalData} />
      <AddStudent />
      <StudentTable />
    </div>
  );
};

export default Students;
