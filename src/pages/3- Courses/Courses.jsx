import React from "react";
import AddCourses from "./AddCources";
import CourseTable from "./CourcesTable";
import Modal from "../../components/Modal";
const Courses = () => {
  return (
    <div style={{ backgroundColor: "#F8F8F8", height: "90vh" }}>
      <Modal />
      <AddCourses />
      <CourseTable />
    </div>
  );
};

export default Courses;
