import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  studentsData: [],
  dataChanging: false,
  loadingState: false,
  id: "",
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
    editingData(state, action) {
      state.id = action.payload;
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
