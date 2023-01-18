import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { doc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
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

export const fetchBookingsByQuery = createAsyncThunk(
  'serviceBookings/fetchBookingsByQuery',
  async (payload) => {
    try {
      const bookings = [];
      const ref = collection(db, 'bookings');
      const q = query(ref, where('uid', '==', payload));
      const snap = await getDocs(q);
      snap.forEach((doc) => {
        bookings.push({ ...doc.data(), id: doc.id });
      });
      return bookings;
    } catch (error) {
      return error;
    }
  }
);

export const serviceBookingSlice = createSlice({
  name: 'serviceBookings',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.fulfilled, (state, action) => {
        return (state = {
          ...state,
          newbooking: action.payload.jobId
        });
      })
      .addCase(fetchBookingsByQuery.fulfilled, (state, action) => {
        return (state = {
          ...state,
          bookings: action.payload
        });
      });
  }
});

export default serviceBookingSlice.reducer;
