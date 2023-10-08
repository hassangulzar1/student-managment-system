import React from "react";
import AddCourses from "./AddCources";
import CourseTable from "./CourcesTable";
import Modal from "../../components/Modal";
const Courses = () => {
  return (
    <>
      <Modal />
      <AddCourses />
      <CourseTable />
    </>
  );
};

export default Courses;
