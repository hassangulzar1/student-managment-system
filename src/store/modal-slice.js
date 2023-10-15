import { createSlice } from "@reduxjs/toolkit";
const initialState = { modalStatus: false, modalFrom: "" };

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal(state, action) {
      state.modalStatus = true;
      state.modalFrom = action.payload;
    },
    closeModal(state) {
      state.modalStatus = false;
      state.modalFrom = "";
    },
  },
});

export const modalActions = modalSlice.actions;
export default modalSlice.reducer;
