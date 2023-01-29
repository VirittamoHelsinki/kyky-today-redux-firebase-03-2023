import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { doc, setDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

/* makes reference to get a auto-generated id, inserts the doc 
to Firestore using the new id, returns the added object */
export const addProfileForm = createAsyncThunk('profileForms/addProfileForm', async (payload) => {
  try {
    const formRef = doc(collection(db, `profiles`));
    await setDoc(formRef, payload);
    return 'profile added';
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
    builder.addCase(addProfileForm.fulfilled, (state, action) => {
      /* clear state when finished */
      state = initialState;
      return (state = {
        ...state
      });
    });
  }
});

export const { updateSteps, resetProfileForm } = profileFormSlice.actions;
export default profileFormSlice.reducer;
