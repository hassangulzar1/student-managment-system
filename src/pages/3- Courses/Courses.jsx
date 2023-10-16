import React, { useEffect } from "react";
import AddCourses from "./AddCources";
import CourseTable from "./CourcesTable";
import Modal from "../../components/Modal";
import { useDispatch, useSelector } from "react-redux";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../config/firebase-config";
import { toast } from "react-toastify";
import { studentDataActions } from "../../store/studentData-slice";

const Courses = () => {
  const dataTracking = useSelector((state) => state.studentsData.dataChanging);
  const dispatch = useDispatch();
  useEffect(() => {
    const dataFetching = async () => {
      let array = [];
      try {
        const data = await getDocs(collection(db, "courses"));
        data.forEach((doc) => {
          array.push(doc.data());
        });
        console.log(array);
        dispatch(studentDataActions.addingData(array));
      } catch (error) {
        return toast.error("data fetching error: " + error.message);
      }
    };
    dataFetching();
  }, [dataTracking]);
  return (
    <div style={{ backgroundColor: "#F8F8F8", height: "90vh" }}>
      <Modal />
      <AddCourses />
      <CourseTable />
    </div>
  );
};

export default Courses;
