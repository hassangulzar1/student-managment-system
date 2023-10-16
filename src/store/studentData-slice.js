import { createSlice } from "@reduxjs/toolkit";
const initialState = { studentsData: null, dataChanging: false };

const studentDataSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    addingData(state, action) {
      state.studentsData = action.payload;
    },
    removingData(state, action) {},
    editData(state, action) {},
    dataChanging(state) {
      state.dataChanging = !state.dataChanging;
    },
  },
});

export const studentDataActions = studentDataSlice.actions;
export default studentDataSlice.reducer;
