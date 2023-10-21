import React, { useEffect, useState } from "react";
import DashboardBoxes from "../../components/DasboardBoxes";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { db } from "../../config/firebase-config";
import { getDocs, collection } from "firebase/firestore";
import Graph from "./Graph";
const Dashboard = () => {
  const [studentsData, setStudentsData] = useState([]);
  const [coursesData, setCoursesData] = useState([]);
  const [attendenceData, setAttendenceData] = useState([]);
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
        setStudentsData(studentsArray);
        setCoursesData(coursesArray);
        setAttendenceData(attendenceArray);
      } catch (error) {
        toast.error("data fetching error: " + error.message);
      }
    };
    dataFetching();
  }, []);
  return (
    <>
      <div className="d-flex justify-content-center">
        <DashboardBoxes
          className="studentBox"
          titleColor="black"
          title="Students"
          count={studentsData.length}
          spinnerColor="#74c1ed"
          Icon={
            <SchoolOutlinedIcon sx={{ fontSize: "3rem", color: "#74c1ed" }} />
          }
        />
        <DashboardBoxes
          className="coursesBox"
          titleColor="black"
          title="Courses"
          spinnerColor="#ee95c5"
          count={coursesData.length}
          Icon={
            <BookmarkBorderOutlinedIcon
              sx={{ fontSize: "3rem", color: "#ee95c5" }}
            />
          }
        />
        <DashboardBoxes
          className="attendeceBox"
          titleColor="white"
          title="Attendence"
          spinnerColor="white"
          count={attendenceData.length}
          Icon={
            <PersonOutlineOutlinedIcon
              sx={{ fontSize: "3rem", color: "white" }}
            />
          }
        />
      </div>
      <div className="d-flex justify-content-center mt-2">
        <Graph
          studentsArray={studentsData}
          coursesArray={coursesData}
          attendenceArray={attendenceData}
        />
      </div>
    </>
  );
};

export default Dashboard;
