import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const createJobByDate = createAsyncThunk('calendar/createJobByDate', async (date) => {
  try {
    console.log(date);
  } catch (error) {
    console.log(error);
  }
});

export const fetchJobsByMonth = createAsyncThunk('calendar/fetchJobsByMonth', async (month) => {
  try {
    console.log(month);
  } catch (error) {
    console.log(error);
  }
});

export const calendarSlice = createSlice({
  name: 'forms',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createJobByDate.pending, (state, action) => {
        console.log(state, action);
      })
      .addCase(createJobByDate.fulfilled, (state, action) => {
        console.log(state, action);
      })
      .addCase(createJobByDate.rejected, (state, action) => {
        console.log(state, action);
      })
      .addCase(fetchJobsByMonth.pending, (state, action) => {
        console.log(state, action);
      })
      .addCase(fetchJobsByMonth.fulfilled, (state, action) => {
        console.log(state, action);
      })
      .addCase(fetchJobsByMonth.rejected, (state, action) => {
        console.log(state, action);
      });
  }
});

export default calendarSlice.reducer;
