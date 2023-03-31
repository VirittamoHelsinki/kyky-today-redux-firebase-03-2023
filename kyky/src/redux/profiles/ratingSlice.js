import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { doc, setDoc, collection, updateDoc, increment } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

export const addRating = createAsyncThunk('rating/addRating', async ({ uid, rating }) => {
  try {
    const rateRef = doc(collection(db, `users`, uid, 'ratings'));
    await setDoc(rateRef, { ...rating });
  } catch (error) {
    return error;
  }
});

export const updateTotalRating = createAsyncThunk(
  'rating/updateTotalRating',
  async ({ uid, rating }) => {
    try {
      await updateDoc(doc(db, 'users', uid, 'data', 'userdata'), {
        totalRating: increment(rating),
        totalAmount: increment(1)
      });
    } catch (error) {
      return error;
    }
  }
);

const initialState = [];

export const ratingSlice = createSlice({
  name: 'rating',
  initialState: initialState,
  reducers: {
    resetRating() {
      return initialState;
    }
  }
});

export const { resetRating } = ratingSlice.actions;
export default ratingSlice.reducer;
