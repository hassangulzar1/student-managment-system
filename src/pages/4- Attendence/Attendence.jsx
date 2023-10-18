import React, { useEffect } from "react";
import Modal from "../../components/Modal";
import AddAttendence from "./AddAttendence";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../config/firebase-config";
import { useDispatch } from "react-redux";
import { attendenceDataActions } from "../../store/attendence-slice";
import { toast } from "react-toastify";

const Attendence = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const dataFetching = async () => {
      let studentsArray = [];
      let coursesArray = [];
      try {
        const studentsData = await getDocs(collection(db, "students"));
        const coursesData = await getDocs(collection(db, "courses"));
        studentsData.forEach((doc) => {
          studentsArray.push(doc.data());
        });
        coursesData.forEach((doc) => {
          coursesArray.push(doc.data());
        });
        dispatch(attendenceDataActions.addingStudents(studentsArray));
        dispatch(attendenceDataActions.addingCourses(coursesArray));
      } catch (error) {
        toast.error("data fetching error: " + error.message);
      }
    };
    dataFetching();
  }, []);

  return (
    <>
      <Modal />
      <AddAttendence />
    </>
  );
};

export default Attendence;
