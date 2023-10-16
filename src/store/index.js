import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modal-slice";
import studentDataSlice from "./studentData-slice";

const store = configureStore({
  reducer: { modal: modalReducer, studentsData: studentDataSlice },
});

export default store;
