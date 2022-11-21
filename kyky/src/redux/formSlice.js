import { createSlice } from '@reduxjs/toolkit';

// Replace the sample code below with actual code

export const formSlice = createSlice({
  name: 'forms',
  reducers: {
    addForm: (state, action) => {
      state.step1.form(action.payload);
    }
  }
});

export const { addForm } = formSlice.actions;
export default formSlice.reducer;
