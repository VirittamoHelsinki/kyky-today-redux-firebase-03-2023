import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { doc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

export const createBooking = createAsyncThunk('serviceBookings/createBooking', async (payload) => {
  try {
    const bookingRef = doc(collection(db, `bookings`));
    await setDoc(bookingRef, payload);
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

export const changeBookingStatus = createAsyncThunk(
  'serviceBookings/changeBookingStatus',
  async (payload) => {
    try {
      const bookingRef = doc(db, 'bookings', payload.booking);
      setDoc(bookingRef, { confirmed: payload.status }, { merge: true });
      return { status: payload.status, id: payload.booking };
    } catch (error) {
      return error;
    }
  }
);

const initialState = [];

export const serviceBookingSlice = createSlice({
  name: 'serviceBookings',
  initialState: initialState,
  reducers: {
    resetServiceBooking() {
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder
      /* return a state with the booking array*/
      .addCase(fetchBookingsByQuery.fulfilled, (state, action) => {
        return (state = {
          ...state,
          bookings: action.payload
        });
      })
      /* make a deep copy of booking state, find the right index using the booking id, change 
      the confirmed value to the status value, return the state with the modified list */
      .addCase(changeBookingStatus.fulfilled, (state, action) => {
        let new_bookings = JSON.parse(JSON.stringify(state.bookings));
        let index = new_bookings.findIndex((f) => f.id === action.payload.id);
        new_bookings[index].confirmed = action.payload.status;
        return (state = {
          ...state,
          bookings: new_bookings
        });
      });
  }
});

export const { resetServiceBooking } = serviceBookingSlice.actions;
export default serviceBookingSlice.reducer;
