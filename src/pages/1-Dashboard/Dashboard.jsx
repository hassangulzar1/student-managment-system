import React, { useEffect, useState } from "react";
import DashboardBoxes from "../../components/DasboardBoxes";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { db } from "../../config/firebase-config";
import { getDocs, collection } from "firebase/firestore";

const Dashboard = () => {
  const [totalStudents, setTotalStudents] = useState(null);
  const [totalCourses, setTotalCourses] = useState(null);

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
        setTotalStudents(studentsArray.length);
        setTotalCourses(coursesArray.length);
      } catch (error) {
        toast.error("data fetching error: " + error.message);
      }
    };
    dataFetching();
  }, []);

  return (
    <div className="d-flex justify-content-center">
      <DashboardBoxes
        className="studentBox"
        titleColor="black"
        title="Students"
        count={totalStudents}
        Icon={
          <SchoolOutlinedIcon sx={{ fontSize: "3rem", color: "#74c1ed" }} />
        }
      />
      <DashboardBoxes
        className="coursesBox"
        titleColor="black"
        title="Courses"
        count={totalCourses}
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
        count={12}
        Icon={
          <PersonOutlineOutlinedIcon
            sx={{ fontSize: "3rem", color: "white" }}
          />
        }
      />
    </div>
  );
};

export default Dashboard;
