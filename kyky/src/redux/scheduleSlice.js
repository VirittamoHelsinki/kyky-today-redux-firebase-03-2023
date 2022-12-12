import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { doc, setDoc, collection, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

export const createSchedule = createAsyncThunk('schedules/createSchedule', async (payload) => {
  try {
    await setDoc(doc(db, `users/${payload.uid}/schedules/${payload.jobId}`), {
      ...payload.data
    });
    return payload;
  } catch (error) {
    return error;
  }
});

export const fetchSchedules = createAsyncThunk('schedules/fetchSchedules', async (uid) => {
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
      list_of_schedules.push({ id: doc.id, data: temp_schedules });
    });
    return list_of_schedules;
  } catch (error) {
    return error;
  }
});

export const removeSchedule = createAsyncThunk('schedules/removeSchedule', async (payload) => {
  try {
    await deleteDoc(doc(db, `users/${payload.uid}/schedules/${payload.schedule}`));
    return payload.schedule;
  } catch (error) {
    return error;
  }
});

// createAsyncThunk() generates automatically pending, fulfilled and rejected handling cases.
// Add pending and rejected cases when needed
export const scheduleSlice = createSlice({
  name: 'Schedules',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createSchedule.fulfilled, (state, action) => {
        localStorage.setItem(
          `${action.payload.jobId}_schedules`,
          JSON.stringify(action.payload.data)
        );
        return (state = {
          ...state,
          status: 'schedule created'
        });
      })
      .addCase(fetchSchedules.fulfilled, (state, action) => {
        console.log(action.payload);
        const jobs = [];
        action.payload.forEach((job) => {
          jobs.push({
            id: job.id,
            categories: [job.id],
            cities: ['Helsinki'],
            jobTitle: job.id
          });
          localStorage.setItem(`${job.id}_schedules`, JSON.stringify(job.data));
        });
        localStorage.setItem('jobs', JSON.stringify(jobs));
        return (state = {
          ...state,
          status: 'schedules fetched'
        });
      })
      .addCase(removeSchedule.fulfilled, (state, action) => {
        localStorage.removeItem(`${action.payload}_schedules`);
        return (state = {
          ...state,
          status: 'schedule removed'
        });
      });
  }
});

export default scheduleSlice.reducer;
