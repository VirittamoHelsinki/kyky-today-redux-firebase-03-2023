import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const createScheduleByDate = createAsyncThunk(
  'calendar/createScheduleByDate',
  async (date) => {
    try {
      console.log(date);
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchSchedulesByMonth = createAsyncThunk(
  'calendar/fetchSchedulesByMonth',
  async (month) => {
    try {
      console.log(month);
    } catch (error) {
      console.log(error);
    }
  }
);

export const calendarSlice = createSlice({
  name: 'Schedules',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createScheduleByDate.pending, (state, action) => {
        console.log(state, action);
      })
      .addCase(createScheduleByDate.fulfilled, (state, action) => {
        console.log(state, action);
      })
      .addCase(createScheduleByDate.rejected, (state, action) => {
        console.log(state, action);
      })
      .addCase(fetchSchedulesByMonth.pending, (state, action) => {
        console.log(state, action);
      })
      .addCase(fetchSchedulesByMonth.fulfilled, (state, action) => {
        console.log(state, action);
      })
      .addCase(fetchSchedulesByMonth.rejected, (state, action) => {
        console.log(state, action);
      });
  }
});

export default calendarSlice.reducer;
