import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { doc, setDoc, collection, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

export const createSchedule = createAsyncThunk(
  'calendarSchedules/createSchedule',
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

export const fetchSchedules = createAsyncThunk('calendarSchedules/fetchSchedules', async (uid) => {
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
});

export const removeSchedule = createAsyncThunk(
  'calendarSchedules/removeSchedule',
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
export const calendarScheduleSlice = createSlice({
  name: 'calendarSchedules',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createSchedule.fulfilled, (state, action) => {
        return (state = {
          ...state,
          [action.payload.jobId + '_schedules']: action.payload.data
        });
      })
      .addCase(fetchSchedules.pending, (state, action) => {
        return (state = {
          ...state,
          loading: true
        });
      })
      .addCase(fetchSchedules.fulfilled, (state, action) => {
        const jobs = [];
        action.payload.forEach((job) => {
          jobs.push({
            id: Object.keys(job),
            categories: [Object.keys(job)],
            cities: ['Helsinki'],
            jobTitle: Object.keys(job)
          });
          state = {
            ...state,
            [Object.keys(job) + '_schedules']: Object.values(job)[0]
          };
        });
        return (state = {
          ...state,
          loading: false,
          jobslist: jobs
        });
      })
      .addCase(removeSchedule.fulfilled, (state, action) => {
        const new_state = { ...state };
        delete new_state[action.payload + '_schedules'];
        return new_state;
      });
  }
});

export default calendarScheduleSlice.reducer;
