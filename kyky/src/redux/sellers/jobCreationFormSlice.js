import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { doc, setDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

export const createJobForm = createAsyncThunk(
  'jobcreation-forms/createJobForm',
  async (payload) => {
    try {
      /* */
      const formRef = doc(collection(db, `jobs`));
      await setDoc(formRef, payload);
      return payload;
    } catch (error) {
      return error;
    }
  }
);

export const jobCreationFormSlice = createSlice({
  name: 'jobcreation-forms',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createJobForm.fulfilled, (state, action) => {
      console.log(action.payload);
    });
  }
});

export default jobCreationFormSlice.reducer;
