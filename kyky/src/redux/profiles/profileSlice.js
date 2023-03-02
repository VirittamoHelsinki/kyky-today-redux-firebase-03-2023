import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

/* makes reference to get a auto-generated id, inserts the doc 
to Firestore using the new id, returns the added object */
export const addProfileForm = createAsyncThunk(
  'profiles/addProfileForm',
  async ({ uid, data }) => {
    try {
      await setDoc(doc(db, 'users', uid, 'data', 'profile'), {
        ...data
      });
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const getUserProfile = createAsyncThunk('profiles/getUserProfile', async (uid) => {
  try {
    const userSnap = await getDoc(doc(db, 'users', uid, 'data', 'userdata'));
    const profileSnap = await getDoc(doc(db, 'users', uid, 'data', 'profile'));
    if (profileSnap.exists()) {
      return {
        ...profileSnap.data(),
        created: userSnap.data().created,
        lastseen: userSnap.data().lastseen
      };
    } else {
      return null;
    }
  } catch (error) {
    return error;
  }
});

export const getDashboardProfile = createAsyncThunk(
  'profiles/getDashboardProfile',
  async (uid) => {
    try {
      const userSnap = await getDoc(doc(db, 'users', uid, 'data', 'userdata'));
      const profileSnap = await getDoc(doc(db, 'users', uid, 'data', 'profile'));
      if (profileSnap.exists()) {
        return {
          ...profileSnap.data(),
          name: userSnap.data().username,
          created: userSnap.data().created
        };
      } else {
        return {
          name: userSnap.data().username,
          s7Url: 'https://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp',
          s1Title: '',
          created: userSnap.data().created
        };
      }
    } catch (error) {
      return error;
    }
  }
);

const initialState = [];

export const profileSlice = createSlice({
  name: 'profiles',
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
    builder
      .addCase(addProfileForm.fulfilled, (state, action) => {
        state = initialState;
        return (state = {
          ...state,
          dashboardProfile: {
            ...state.dashboardProfile,
            ...action.payload
          }
        });
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        return (state = {
          ...state,
          userProfile: { ...action.payload }
        });
      })
      .addCase(getDashboardProfile.fulfilled, (state, action) => {
        return (state = {
          ...state,
          dashboardProfile: { ...action.payload }
        });
      });
  }
});

export const { updateSteps, resetProfileForm } = profileSlice.actions;
export default profileSlice.reducer;
