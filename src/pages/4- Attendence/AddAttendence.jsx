import React from "react";
import StudentCoursesHead from "../../components/student-courses-head";
const AddAttendence = () => {
  return (
    <div>
      <StudentCoursesHead
        title="Attendence list"
        modal="Attendence"
        buttonName="Record Attendence"
      />
    </div>
  );
};

export default AddAttendence;
