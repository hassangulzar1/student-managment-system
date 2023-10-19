import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import useInput from "../hooks/use-inputs";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../store/modal-slice";
import { setDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { toast } from "react-toastify";
import { studentDataActions } from "../store/studentData-slice";
import Autocomplete from "@mui/material/Autocomplete";

const ModalInputs = () => {
  const dispatch = useDispatch();
  const modalFrom = useSelector((state) => state.modal.modalFrom);
  const modalCloseHandler = () => {
    dispatch(modalActions.closeModal());
  };

  //! Data for attendence dropdowns
  const [selectedStudent, setSelectedStudent] = React.useState(null);
  const [selectedCourse, setSelectedCourse] = React.useState(null);
  const studentsArray = useSelector((state) => state.attendence.studentsData);
  const coursesArray = useSelector((state) => state.attendence.coursesData);

  const propsForStudents = {
    options: studentsArray,
    getOptionLabel: (option) => `${option.name}  (${option.email})`,
  };
  const propsForCourses = {
    options: coursesArray,
    getOptionLabel: (option) => option.title,
  };

  const handleAutoComplete = (event, newValue) => {
    if (event.target.id.slice(0, 7) === "student") {
      if (newValue) {
        setSelectedStudent(newValue);
      } else {
        setSelectedStudent(null);
      }
    } else {
      if (newValue) {
        setSelectedCourse(newValue);
      } else {
        setSelectedCourse(null);
      }
    }
  };
  //! Inputs States
  const [genderState, setGenderState] = useState();
  const {
    enteredValue: enteredName,
    isValid: nameIsValid,
    inputChangeHandler: nameChangeHandler,
    onBlurHandler: nameBlurHanlder,
    hasError: nameInputIsValid,
    reset: resetName,
  } = useInput((value) => value.trim() !== "");

  const {
    enteredValue: enteredEmail,
    isValid: emailIsValid,
    inputChangeHandler: emailChangeHandler,
    onBlurHandler: emailBlurHandler,
    hasError: emailInputIsValid,
    reset: emailReset,
  } = useInput((value) => value.includes("@"));
  const {
    enteredValue: enteredSallary,
    isValid: sallaryIsValid,
    inputChangeHandler: sallaryChangeHandler,
    onBlurHandler: sallaryBlurHandler,
    hasError: sallaryInputIsValid,
    reset: sallaryReset,
  } = useInput((value) => value.trim() !== "");
  const {
    enteredValue: enteredDate,
    isValid: dateIsValid,
    inputChangeHandler: DateChangeHandler,
    onBlurHandler: DateBlurHandler,
    hasError: dateInputIsValid,
    reset: DateReset,
  } = useInput((value) => value.trim() !== "");

  let formIsValid = false;
  if (nameIsValid && sallaryIsValid && dateIsValid) {
    formIsValid = true;
  }

  //! Submit Handler
  const isEditingMode = useSelector((state) => state.modal.isEditing);
  const isLoading = useSelector((state) => state.studentsData.loadingState);
  const dataArray = useSelector((state) => state.studentsData.studentsData);
  const attendenceArray = useSelector(
    (state) => state.attendence.attendenceData
  );
  const id = useSelector((state) => state.studentsData.id);
  const From = useSelector((state) => state.modal.modalFrom);
  //! Updating inputs
  useEffect(() => {
    if (isEditingMode && From === "Student") {
      let particularElement = dataArray.filter((e) => e.id === id);
      nameChangeHandler(particularElement[0].name);
      emailChangeHandler(particularElement[0].email);
      sallaryChangeHandler(particularElement[0].phone);
      DateChangeHandler(new Date(particularElement[0].date).toDateString());
      setGenderState(particularElement[0].gender);
    } else if (isEditingMode && From === "Course") {
      let particularElement = dataArray.filter((e) => e.id === id);
      nameChangeHandler(particularElement[0].title);
      sallaryChangeHandler(particularElement[0].desc);
      DateChangeHandler(particularElement[0].code);
    } else {
      let particularElement = attendenceArray.filter((e) => e.id === id);
      let student = studentsArray.filter(
        (e) => e.id === particularElement[0].studentId
      );
      let course = coursesArray.filter(
        (e) => e.id === particularElement[0].courseId
      );
      setSelectedStudent(student[0]);
      setSelectedCourse(course[0]);
      setGenderState(particularElement[0].status);
      DateChangeHandler(particularElement[0].date);
    }
  }, [isEditingMode]);

  //! Student Data Submit Handler
  const options = { year: "numeric", month: "long", day: "numeric" };
  const studentSubmitHandler = async (e) => {
    e.preventDefault();
    dispatch(studentDataActions.startloading());
    if (!isEditingMode) {
      let id = Math.random().toString(36).slice(2);
      try {
        await setDoc(doc(db, "students", id), {
          id: id,
          name: enteredName,
          email: enteredEmail,
          gender: genderState,
          phone: enteredSallary,
          date: new Date(enteredDate).toLocaleDateString("en-US", options),
        });
        dispatch(studentDataActions.dataChanging());
        dispatch(modalActions.closeModal());
        toast.success("New student Added successfully");
      } catch (error) {
        toast.error("Something went wrong" + error.message);
      }
    } else {
      try {
        await updateDoc(doc(db, "students", id), {
          id: id,
          name: enteredName,
          email: enteredEmail,
          gender: genderState,
          phone: enteredSallary,
          date: new Date(enteredDate).toLocaleDateString("en-US", options),
        });
        dispatch(studentDataActions.dataChanging());
        dispatch(modalActions.closeModal());

        toast.success("student Update Successfully");
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong " + error.message);
      }
    }
    dispatch(studentDataActions.closeLoading());
  };

  //! Course Data Submit Handler
  const courseSubmitHandler = async (e) => {
    e.preventDefault();
    dispatch(studentDataActions.startloading());
    if (!isEditingMode) {
      let id = Math.random().toString(36).slice(2);
      try {
        await setDoc(doc(db, "courses", id), {
          id: id,
          title: enteredName,
          code: enteredDate,
          desc: enteredSallary,
        });
        dispatch(studentDataActions.dataChanging());
        dispatch(modalActions.closeModal());
        toast.success("New Course Added successfully");
      } catch (error) {
        toast.error("Something went wrong" + error.message);
      }
    } else {
      try {
        await updateDoc(doc(db, "courses", id), {
          id: id,
          title: enteredName,
          code: enteredSallary,
          desc: enteredDate,
        });
        dispatch(studentDataActions.dataChanging());
        dispatch(modalActions.closeModal());

        toast.success("student Update Successfully");
      } catch (error) {
        toast.error("Something went wrong " + error.message);
      }
    }
    dispatch(studentDataActions.closeLoading());
  };

  //! Attendence Submit Handler
  const prevAttendence = useSelector(
    (state) => state.attendence.attendenceData
  );

  const attendenceSubmitHandler = async (e) => {
    e.preventDefault();

    const checkIfExist = prevAttendence.filter((data) => {
      if (
        data.studentId === selectedStudent &&
        data.courseId === selectedCourse &&
        data.date === enteredDate
      ) {
        return data;
      }
    });
    if (checkIfExist.length > 0) {
      return toast.error("you already mark this student attendence");
    }

    dispatch(studentDataActions.startloading());
    if (!isEditingMode) {
      let id = Math.random().toString(36).slice(2);
      try {
        await setDoc(doc(db, "attendence", id), {
          id: id,
          studentId: selectedStudent.id,
          courseId: selectedCourse.id,
          date: enteredDate,
          status: genderState,
        });
        dispatch(studentDataActions.dataChanging());
        dispatch(modalActions.closeModal());
        toast.success("Attendence Marked successfully");
      } catch (error) {
        toast.error("Something went wrong" + error.message);
      }
    } else {
      try {
        await updateDoc(doc(db, "attendence", id), {
          id: id,
          studentId: selectedStudent.id,
          courseId: selectedCourse.id,
          date: enteredDate,
          status: genderState,
        });
        dispatch(studentDataActions.dataChanging());
        dispatch(modalActions.closeModal());

        toast.success("attendence Update Successfully");
      } catch (error) {
        toast.error("Something went wrong " + error.message);
      }
    }
    dispatch(studentDataActions.closeLoading());
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "0 50px",
        flexDirection: "column",
      }}
    >
      {modalFrom === "Student" && (
        <form onSubmit={studentSubmitHandler}>
          <TextField
            fullWidth
            color="warning"
            autoFocus
            sx={{
              marginY: 1,
            }}
            type="text"
            name="name"
            label="User Name"
            value={enteredName}
            onChange={(e) => nameChangeHandler(e.target.value)}
            onBlur={nameBlurHanlder}
            error={nameInputIsValid}
            helperText={
              nameInputIsValid ? "Please enter a valid User Name" : ""
            }
          />
          <TextField
            fullWidth
            sx={{ marginY: 1 }}
            color="warning"
            type="email"
            label="Email"
            name="email"
            onChange={(e) => emailChangeHandler(e.target.value)}
            onBlur={emailBlurHandler}
            error={emailInputIsValid}
            value={enteredEmail}
            helperText={
              emailInputIsValid ? "Please enter a valid email (@)" : ""
            }
          />
          <TextField
            fullWidth
            sx={{ marginY: 1 }}
            color="warning"
            type="phone"
            label="Phone No."
            name="phone"
            value={enteredSallary}
            onChange={(e) => sallaryChangeHandler(e.target.value)}
            onBlur={sallaryBlurHandler}
            error={sallaryInputIsValid}
            helperText={
              sallaryInputIsValid ? "Please enter a valid Phone No." : ""
            }
          />
          <TextField
            fullWidth
            sx={{ marginY: 1 }}
            color="warning"
            type="date"
            name="date"
            value={enteredDate}
            onChange={(e) => DateChangeHandler(e.target.value)}
            onBlur={DateBlurHandler}
            error={dateInputIsValid}
            helperText={dateInputIsValid ? "Please enter a valid Date" : ""}
          />
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Gender
            </FormLabel>
            <RadioGroup
              sx={{ display: "flex", justifyContent: "center" }}
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="radio"
              onChange={(e) => setGenderState(e.target.value)}
            >
              <FormControlLabel
                value="female"
                checked={genderState === "female"}
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel
                value="male"
                checked={genderState === "male"}
                control={<Radio />}
                label="Male"
              />
              <FormControlLabel
                value="other"
                checked={genderState === "other"}
                control={<Radio />}
                label="other"
              />
            </RadioGroup>
          </FormControl>
          <Stack
            direction="row"
            spacing={2}
            sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}
          >
            <Button
              variant="contained"
              sx={{
                color: "black",
                marginTop: ".4rem",
                fontWeight: "bold",
                paddingX: "1rem",
                fontFamily: "Montserrat",
                background: isEditingMode ? "success" : "#FEAF00",
                color: "#FFFFFF",
                marginRight: 4,
                "&:hover": {
                  background:
                    "linear-gradient(90deg, rgba(254,175,0,1) 0%, rgba(252,220,148,1) 100%)",
                },
              }}
              type="submit"
              disabled={!formIsValid}
            >
              {isEditingMode ? (isLoading ? "Updating..." : "Update") : ""}
              {!isEditingMode ? (isLoading ? "Adding..." : "ADD User") : ""}
            </Button>
            <Button
              sx={{ fontFamily: "Montserrat", fontWeight: "bold" }}
              variant="outlined"
              color="error"
              onClick={modalCloseHandler}
            >
              Close
            </Button>
          </Stack>
        </form>
      )}

      {modalFrom === "Course" && (
        <form action="" onSubmit={courseSubmitHandler}>
          <TextField
            fullWidth
            autoFocus
            sx={{ marginY: 1 }}
            type="text"
            color="warning"
            label="Course Title"
            value={enteredName}
            onChange={(e) => nameChangeHandler(e.target.value)}
            onBlur={nameBlurHanlder}
            error={nameInputIsValid}
            helperText={
              nameInputIsValid ? "Please enter a valid User Name" : ""
            }
          />
          <TextField
            fullWidth
            sx={{ marginY: 1 }}
            type="text"
            label="Course Code"
            color="warning"
            value={enteredDate}
            onChange={(e) => DateChangeHandler(e.target.value)}
            onBlur={DateBlurHandler}
            error={dateInputIsValid}
            helperText={
              dateInputIsValid ? "Please enter a valid Course Code " : ""
            }
          />
          <TextField
            fullWidth
            sx={{ marginY: 1 }}
            type="text"
            label="Description"
            value={enteredSallary}
            color="warning"
            onChange={(e) => sallaryChangeHandler(e.target.value)}
            onBlur={sallaryBlurHandler}
            error={sallaryInputIsValid}
            helperText={
              sallaryInputIsValid ? "Please enter a valid Description" : ""
            }
          />

          <Stack
            direction="row"
            spacing={2}
            sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}
          >
            <Button
              variant="contained"
              color={isEditingMode ? "info" : "success"}
              type="submit"
              disabled={!formIsValid}
            >
              {isEditingMode ? (isLoading ? "Updating..." : "Update") : ""}
              {!isEditingMode ? (isLoading ? "Adding..." : "ADD Course") : ""}
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={modalCloseHandler}
            >
              Close
            </Button>
          </Stack>
        </form>
      )}

      {modalFrom === "Attendence" && (
        <form action="" onSubmit={attendenceSubmitHandler}>
          <Autocomplete
            sx={{ marginY: 2 }}
            {...propsForStudents}
            id="students"
            value={selectedStudent}
            onChange={handleAutoComplete}
            renderInput={(params) => (
              <TextField
                {...params}
                color="warning"
                label="Select Student"
                variant="standard"
                required
              />
            )}
          />

          <Autocomplete
            {...propsForCourses}
            sx={{ marginY: 2 }}
            id="courses"
            value={selectedCourse}
            onChange={handleAutoComplete}
            renderInput={(params) => (
              <TextField
                {...params}
                color="warning"
                label="Select Course"
                variant="standard"
                required
              />
            )}
          />
          <TextField
            fullWidth
            sx={{ marginY: 2 }}
            required
            color="warning"
            type="date"
            name="date"
            value={enteredDate}
            onChange={(e) => DateChangeHandler(e.target.value)}
            onBlur={DateBlurHandler}
            error={dateInputIsValid}
            helperText={dateInputIsValid ? "Please enter a valid Date" : ""}
          />
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Status
            </FormLabel>
            <RadioGroup
              sx={{ display: "flex", justifyContent: "center" }}
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="radio"
              onChange={(e) => setGenderState(e.target.value)}
            >
              <FormControlLabel
                required
                value="present"
                checked={genderState === "present"}
                control={<Radio />}
                label="Present"
              />
              <FormControlLabel
                required
                value="absent"
                checked={genderState === "absent"}
                control={<Radio />}
                label="Absent"
              />
            </RadioGroup>
          </FormControl>
          <Stack
            direction="row"
            spacing={2}
            sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}
          >
            <Button
              variant="contained"
              color={isEditingMode ? "info" : "success"}
              type="submit"
            >
              {isEditingMode ? (isLoading ? "Updating..." : "Update") : ""}
              {!isEditingMode
                ? isLoading
                  ? "Marking..."
                  : "Mark Attendence"
                : ""}
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={modalCloseHandler}
            >
              Close
            </Button>
          </Stack>
        </form>
      )}
    </div>
  );
};

export default ModalInputs;
