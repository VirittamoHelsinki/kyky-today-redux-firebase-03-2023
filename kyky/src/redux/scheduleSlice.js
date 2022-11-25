import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { doc, setDoc, collection, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const uid = 'uorthtrg'; //testing only

export const createSchedule = createAsyncThunk('schedules/createSchedule', async (schedules) => {
  try {
    await setDoc(doc(db, `${uid}/${schedules.jobId}`), {
      data: schedules.data
    });
    return schedules;
  } catch (error) {
    console.log(error);
  }
});

export const fetchSchedules = createAsyncThunk('schedules/fetchSchedules', async () => {
  try {
    const scheduleList = [];
    const schedules = await getDocs(collection(db, uid));
    schedules.forEach((schedule) => {
      scheduleList.push({ id: schedule.id, data: schedule.data() });
    });
    return scheduleList;
  } catch (error) {
    console.log(error);
  }
});

export const removeSchedule = createAsyncThunk('schedules/removeSchedule', async (schedule) => {
  try {
    await deleteDoc(doc(db, uid, schedule));
    return schedule;
  } catch (error) {
    console.log(error);
  }
});

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

      .addCase(removeSchedule.pending, (state, action) => {
        console.log(state, action);
      })
      .addCase(removeSchedule.fulfilled, (state, action) => {
        localStorage.removeItem(`${action.payload}_schedules`);
        console.log(state, action);
      })
      .addCase(removeSchedule.rejected, (state, action) => {
        console.log(state, action);
      });
  }
});

export default scheduleSlice.reducer;
