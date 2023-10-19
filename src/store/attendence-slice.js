import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  studentsData: [],
  coursesData: [],
  attendenceData: [],
};

const attendenceDataSlice = createSlice({
  name: "attendence",
  initialState,
  reducers: {
    addingStudents(state, actione) {
      state.studentsData = actione.payload;
    },
    addingCourses(state, action) {
      state.coursesData = action.payload;
    },
    addingAttendence(state, action) {
      state.attendenceData = action.payload;
    },
  },
});

export const attendenceDataActions = attendenceDataSlice.actions;
export default attendenceDataSlice.reducer;
