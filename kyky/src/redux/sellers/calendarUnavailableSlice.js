import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

export const createUnavailability = createAsyncThunk(
  'calendarUnavailabilities/createUnavailability',
  async ({ uid, data }) => {
    try {
      await setDoc(doc(db, 'users', uid, 'unavailabilities'), {
        ...data
      });
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const fetchUnavailabilities = createAsyncThunk(
  'calendarUnavailabilities/fetchUnavailabilities',
  async (uid) => {
    try {
      const unavailabilities = await getDoc(db, 'users', uid, 'unavailabilities');
      return unavailabilities.data() ? unavailabilities.data() : [];
    } catch (error) {
      return error;
    }
  }
);

const initialState = [];

export const calendarUnavailableSlice = createSlice({
  name: 'calendarUnavailables',
  initialState: initialState,
  reducers: {
    resetCalendarUnavailable() {
      return initialState;
    }
  },
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

export const { resetCalendarUnavailable } = calendarUnavailableSlice.actions;
export default calendarUnavailableSlice.reducer;
