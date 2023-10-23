import React, { useEffect, useState } from "react";
import DashboardBoxes from "../../components/DasboardBoxes";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { db } from "../../config/firebase-config";
import { getDocs, collection } from "firebase/firestore";
import Graph from "./Graph";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const Dashboard = () => {
  const [date, setDate] = useState(null);
  const [checkBox, setCheckBox] = useState(false);
  const [studentsData, setStudentsData] = useState([]);
  const [coursesData, setCoursesData] = useState([]);
  const [attendenceData, setAttendenceData] = useState([]);
  const [Data, setData] = useState([]);
  const [filteredAttendence, setFilteredAttendence] = useState([]);

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
  useEffect(() => {
    const data = [];
    let absent = 0;
    let present = 0;
    let courseName = "";
    coursesData.forEach((element, i) => {
      courseName = coursesData[i].title;
      filteredAttendence.map((e) => {
        if (element.id === e.courseId) {
          if (e.status === "present") {
            present++;
          } else {
            absent++;
          }
        }
      });
      data.push({ courseName, present, absent });
      absent = 0;
      present = 0;
      courseName = "";
    });
    setData(data);
  }, [studentsData, coursesData, filteredAttendence]);

  useEffect(() => {
    const attendenceAfterFilter = attendenceData.filter(
      (e) => new Date(e.date).toDateString() == new Date(date).toDateString()
    );

    setFilteredAttendence(checkBox ? attendenceData : attendenceAfterFilter);
  }, [date, checkBox]);

  const checkBoxHandler = (e) => {
    if (e.target.checked) {
      setDate(null);
      setCheckBox(true);
    } else {
      setCheckBox(false);
    }
  };
  const dateChangeHandler = (e) => {
    setDate(e);
    setCheckBox(false);
  };
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "1rem",
          alignItems: "center",
        }}
      >
        <h2
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Students Status per Course
        </h2>
        <div style={{ textAlign: "center" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                value={date}
                onChange={dateChangeHandler}
                label={checkBox ? "Overall Attendence" : "Attendence Per Date"}
              />
            </DemoContainer>
          </LocalizationProvider>
          <FormControlLabel
            checked={checkBox}
            onChange={checkBoxHandler}
            control={<Checkbox />}
            label="Overall Attendence"
          />
        </div>
      </div>
      <div className="d-flex justify-content-center mt-3">
        {Data.length !== 0 && <Graph Data={Data} />}
        {Data.length === 0 && <p style={{ fontSize: "1.5rem" }}>Loading...</p>}
      </div>
    </>
  );
};

export default Dashboard;
