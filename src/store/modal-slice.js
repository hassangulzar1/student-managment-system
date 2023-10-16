import { createSlice } from "@reduxjs/toolkit";
const initialState = { modalStatus: false, modalFrom: "", isEditing: false };

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
      state.isEditing = false;
    },
    editModal(state, action) {
      state.isEditing = true;
      state.modalStatus = true;
      state.modalFrom = action.payload;
    },
  },
});

export const modalActions = modalSlice.actions;
export default modalSlice.reducer;
