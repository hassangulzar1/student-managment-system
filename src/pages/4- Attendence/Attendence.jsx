import React, { useEffect } from "react";
import Modal from "../../components/Modal";
import AddAttendence from "./AddAttendence";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../config/firebase-config";
import { useDispatch, useSelector } from "react-redux";
import { attendenceDataActions } from "../../store/attendence-slice";
import { toast } from "react-toastify";
import AttendenceTable from "./AttendenceTable";
const Attendence = () => {
  const dispatch = useDispatch();
  const dataTracking = useSelector((state) => state.studentsData.dataChanging);
  useEffect(() => {
    const dataFetching = async () => {
      let studentsArray = [];
      let coursesArray = [];
      let attendenceArray = [];
      try {
        const studentsData = await getDocs(collection(db, "students"));
        const coursesData = await getDocs(collection(db, "courses"));
        const attendenceData = await getDocs(collection(db, "attendence"));
        studentsData.forEach((doc) => {
          studentsArray.push(doc.data());
        });
        coursesData.forEach((doc) => {
          coursesArray.push(doc.data());
        });
        attendenceData.forEach((doc) => {
          attendenceArray.push(doc.data());
        });
        dispatch(attendenceDataActions.addingStudents(studentsArray));
        dispatch(attendenceDataActions.addingCourses(coursesArray));
        dispatch(attendenceDataActions.addingAttendence(attendenceArray));
      } catch (error) {
        toast.error("data fetching error: " + error.message);
      }
    };
    dataFetching();
  }, [dataTracking]);

  return (
    <div style={{ backgroundColor: "#F8F8F8", height: "100vh" }}>
      <Modal />
      <AddAttendence />
      <AttendenceTable />
    </div>
  );
};

export default Attendence;
