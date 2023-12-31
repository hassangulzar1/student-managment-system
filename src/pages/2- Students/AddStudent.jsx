import React, { Fragment } from "react";
import StudentCoursesHead from "../../components/student-courses-head";
const AddUser = () => {
  return (
    //! Add Button
    <Fragment>
      <StudentCoursesHead
        title="Students List"
        modal="Student"
        buttonName="ADD NEW STUDENTS"
      />
    </Fragment>
  );
};

export default AddUser;
