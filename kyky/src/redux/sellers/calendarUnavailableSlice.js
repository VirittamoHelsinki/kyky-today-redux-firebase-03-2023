import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { doc, setDoc, collection, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

export const createUnavailability = createAsyncThunk(
  'calendarUnavailabilities/createUnavailability',
  async (payload) => {
    try {
      await setDoc(doc(db, `users/${payload.uid}/schedules/${payload.jobId}`), {
        ...payload.data
      });
      return payload;
    } catch (error) {
      return error;
    }
  }
);

export const fetchUnavailabilities = createAsyncThunk(
  'calendarUnavailabilities/fetchUnavailabilities',
  async (uid) => {
    try {
      const list_of_schedules = [];
      const schedules = await getDocs(collection(db, `users/${uid}/schedules/`));
      schedules.docs.map((doc) => {
        let temp_schedules = [];
        let i = 0;
        while (doc.data()[i]) {
          temp_schedules.push(doc.data()[i]);
          i++;
        }
        list_of_schedules.push({ [doc.id]: temp_schedules });
      });
      return list_of_schedules;
    } catch (error) {
      return error;
    }
  }
);

export const removeUnavailability = createAsyncThunk(
  'calendarUnavailabilities/removeUnavailability',
  async (payload) => {
    try {
      await deleteDoc(doc(db, `users/${payload.uid}/schedules/${payload.schedule}`));
      return payload.schedule;
    } catch (error) {
      return error;
    }
  }
);

// createAsyncThunk() generates automatically pending, fulfilled and rejected handling cases.
// Add pending and rejected cases when needed
export const calendarUnavailableSlice = createSlice({
  name: 'CalendarUnavailabilities',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder;
  }
});

export default calendarUnavailableSlice.reducer;
