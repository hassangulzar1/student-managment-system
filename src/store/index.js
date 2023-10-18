import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modal-slice";
import studentDataSlice from "./studentData-slice";
import attendenceDataSlice from "./attendence-slice";
const store = configureStore({
  reducer: {
    modal: modalReducer,
    studentsData: studentDataSlice,
    attendence: attendenceDataSlice,
  },
});

export default store;
