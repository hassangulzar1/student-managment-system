import React, { Fragment } from "react";
import StudentCoursesHead from "../../components/student-courses-head";
const AddUser = () => {
  return (
    //! Add Button
    <Fragment>
      <StudentCoursesHead
        title="Courses list"
        modal="Course"
        buttonName="ADD NEW COURSES"
      />
    </Fragment>
  );
};

export default AddUser;
