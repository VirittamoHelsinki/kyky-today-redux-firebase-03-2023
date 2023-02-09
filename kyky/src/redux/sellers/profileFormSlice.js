import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { doc, setDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

/* makes reference to get a auto-generated id, inserts the doc 
to Firestore using the new id, returns the added object */
export const addProfileForm = createAsyncThunk('profileForms/addProfileForm', async (payload) => {
  try {
    await setDoc(doc(db, 'users', payload.uid, 'data', 'profile'), {
      ...payload.data
    });
    return 'profile added ' + new Date();
  } catch (error) {
    return error;
  }
});

const initialState = [];

export const profileFormSlice = createSlice({
  name: 'profileForms',
  initialState: initialState,
  reducers: {
    updateSteps(state, action) {
      return {
        ...state,
        ...action.payload
      };
    },
    resetProfileForm() {
      return initialState;
    }
  },
  extraReducers: (builder) => {
    /* clear state when finished, return an info about succesfull adding with the timestamp */
    builder.addCase(addProfileForm.fulfilled, (state, action) => {
      state = initialState;
      return (state = {
        ...state,
        ...action.payload
      });
    });
  }
});

export const { updateSteps, resetProfileForm } = profileFormSlice.actions;
export default profileFormSlice.reducer;
