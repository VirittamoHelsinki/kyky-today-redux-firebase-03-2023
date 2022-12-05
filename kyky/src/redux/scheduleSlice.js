import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { doc, setDoc, collection, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

export const createSchedule = createAsyncThunk('schedules/createSchedule', async (payload) => {
  try {
    await setDoc(doc(db, `users/${payload.uid}/schedules/${payload.jobId}`), {
      data: payload.data
    });
    return payload;
  } catch (error) {
    return error;
  }
});

export const fetchSchedules = createAsyncThunk('schedules/fetchSchedules', async (uid) => {
  try {
    console.log(uid);
    const list = [];
    const schedules = await getDocs(collection(db, `users/${uid}/schedules/`));
    schedules.forEach((schedule) => {
      list.push({ id: schedule.id, data: schedule.data() });
    });
    return list;
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

// createAsyncThunk() generates automatically pending -, fulfilled - and rejected handling cases
export const scheduleSlice = createSlice({
  name: 'Schedules',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createSchedule.pending, (state, action) => {
        console.log(state, action);
      })
      .addCase(createSchedule.fulfilled, (state, action) => {
        const name = action.payload.jobId;
        const list = [];
        action.payload.data.forEach((d) => {
          list.push(d);
        });
        localStorage.setItem(`${name}_schedules`, JSON.stringify(list));
        return (state = {
          ...state,
          status: 'schedule created'
        });
      })
      .addCase(createSchedule.rejected, (state, action) => {
        console.log(state, action);
      })
      /////////////////////////////////////////////////////
      .addCase(fetchSchedules.pending, (state, action) => {
        console.log(state, action);
      })
      .addCase(fetchSchedules.fulfilled, (state, action) => {
        const jobs = [];
        action.payload.forEach((job) => {
          jobs.push({
            id: job.id,
            categories: [job.id],
            cities: ['Helsinki'],
            jobTitle: job.id
          });
          const schedules = [];
          job.data.data.forEach((d) => {
            schedules.push(d);
          });
          localStorage.setItem(`${job.id}_schedules`, JSON.stringify(schedules));
        });
        localStorage.setItem('jobs', JSON.stringify(jobs));
        return (state = {
          ...state,
          status: 'schedules fetched'
        });
      })
      .addCase(fetchSchedules.rejected, (state, action) => {
        console.log(state, action);
      })
      ////////////////////////////////////////////////////
      .addCase(removeSchedule.pending, (state, action) => {
        console.log(state, action);
      })
      .addCase(removeSchedule.fulfilled, (state, action) => {
        localStorage.removeItem(`${action.payload}_schedules`);
        return (state = {
          ...state,
          status: 'schedule removed'
        });
      })
      .addCase(removeSchedule.rejected, (state, action) => {
        console.log(state, action);
      });
  }
});

export default scheduleSlice.reducer;
