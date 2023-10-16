import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  studentsData: null,
  dataChanging: false,
  loadingState: false,
};

const studentDataSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    addingData(state, action) {
      state.studentsData = action.payload;
    },
    dataChanging(state) {
      state.dataChanging = !state.dataChanging;
    },
    startloading(state) {
      state.loadingState = true;
    },
    closeLoading(state) {
      state.loadingState = false;
    },
  },
});

export const studentDataActions = studentDataSlice.actions;
export default studentDataSlice.reducer;
