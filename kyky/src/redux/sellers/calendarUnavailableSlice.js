import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { doc, setDoc, collection, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

export const createUnavailability = createAsyncThunk(
  'calendarUnavailabilities/createUnavailability',
  async (payload) => {
    try {
      await setDoc(doc(db, `users/${payload.uid}/unavailabilities`), {
        ...payload.data
      });
      return payload.data;
    } catch (error) {
      return error;
    }
  }
);

export const fetchUnavailabilities = createAsyncThunk(
  'calendarUnavailabilities/fetchUnavailabilities',
  async (uid) => {
    try {
      // const unavail_list = [];
      const unavailabilities = await getDoc(db, `users/${uid}/unavailabilities/`);
      // unavailabilities.forEach((doc) => {
      //   unavail_list.push(doc.data());
      // });
      console.log(unavailabilities.data());
      return unavailabilities.data() ? unavailabilities.data() : [];
    } catch (error) {
      return error;
    }
  }
);

export const calendarUnavailableSlice = createSlice({
  name: 'calendarUnavailables',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUnavailability.fulfilled, (state, action) => {
        return (state = {
          ...state,
          unavailabilities: action.payload
        });
      })
      .addCase(fetchUnavailabilities.fulfilled, (state, action) => {
        console.log(action.payload);
        return (state = {
          ...state,
          unavailabilities: action.payload
        });
      });
  }
});

export default calendarUnavailableSlice.reducer;
