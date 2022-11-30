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
    console.log(error);
  }
});

export const fetchSchedules = createAsyncThunk('schedules/fetchSchedules', async (uid) => {
  try {
    console.log(uid);
    const scheduleList = [];
    const schedules = await getDocs(collection(db, `users/${uid}/schedules/`));
    schedules.forEach((schedule) => {
      scheduleList.push({ id: schedule.id, data: schedule.data() });
    });
    return scheduleList;
  } catch (error) {
    console.log(error);
  }
});

export const removeSchedule = createAsyncThunk('schedules/removeSchedule', async (payload) => {
  try {
    await deleteDoc(doc(db, `users/${payload.uid}/schedules/${payload.schedule}`));
    return payload.schedule;
  } catch (error) {
    console.log(error);
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
        console.log(state, action);
      })
      .addCase(createSchedule.rejected, (state, action) => {
        console.log(state, action);
      })
      /////////////////////////////////////////////////////
      .addCase(fetchSchedules.pending, (state, action) => {
        console.log(state, action);
      })
      .addCase(fetchSchedules.fulfilled, (state, action) => {
        action.payload.forEach((job) => {
          const name = job.id;
          const list = [];
          const data = job.data.data;
          data.forEach((d) => {
            list.push(d);
          });
          localStorage.setItem(`${name}_schedules`, JSON.stringify(list));
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
      })
      .addCase(removeSchedule.rejected, (state, action) => {
        console.log(state, action);
      });
  }
});

export default scheduleSlice.reducer;
