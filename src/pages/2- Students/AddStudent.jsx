import React, { Fragment, useContext } from "react";
import StudentCoursesHead from "../../components/student-courses-head";
const AddUser = () => {
  return (
    //! Add Button
    <Fragment>
      <StudentCoursesHead title="Students List" buttonName="ADD NEW STUDENTS" />
    </Fragment>
  );
};

export default AddUser;
