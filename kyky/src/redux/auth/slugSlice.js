import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

export const getUserId = createAsyncThunk('slugs/getUserId', async (slug) => {
  try {
    const docSnap = await getDoc(doc(db, 'slugs', slug));
    return docSnap.data();
  } catch (error) {
    return error;
  }
});

const initialState = [];

export const slugSlice = createSlice({
  name: 'slugs',
  initialState: initialState,
  reducers: {
    resetSlug() {
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUserId.fulfilled, (state, action) => {
      return (state = {
        ...state,
        ...action.payload
      });
    });
  }
});

export const { resetSlug } = slugSlice.actions;
export default slugSlice.reducer;
