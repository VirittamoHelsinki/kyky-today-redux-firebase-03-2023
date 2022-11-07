import { createSlice } from '@reduxjs/toolkit';

// Replace the sample code below with actual code
export const formSlice = createSlice({
  name: 'changeThisName',
  reducers: {
    changeThisName(state, action) {
      const content = action.payload;
      state.push({
        content
      });
    }
  }
});
