import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { doc, setDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

export const createBooking = createAsyncThunk('serviceBookings/createBooking', async (payload) => {
  try {
    const bookingRef = doc(collection(db, `bookings`));
    await setDoc(bookingRef, payload);
    return payload;
  } catch (error) {
    return error;
  }
});

export const serviceBookingSlice = createSlice({
  name: 'serviceBookings',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createBooking.fulfilled, (state, action) => {
      return (state = {
        ...state,
        bookings: action.payload
      });
    });
  }
});

export default serviceBookingSlice.reducer;
