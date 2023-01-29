import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { doc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

/* makes reference to get a auto-generated id, inserts the doc 
to Firestore using the new id, returns the added object */
export const createJobForm = createAsyncThunk(
  'jobcreation-forms/createJobForm',
  async (payload) => {
    try {
      const formRef = doc(collection(db, `jobs`));
      await setDoc(formRef, payload);
      return payload;
    } catch (error) {
      return error;
    }
  }
);

export const fetchJobsByQuery = createAsyncThunk(
  'jobcreation-forms/fetchJobsByQuery',
  async (payload) => {
    try {
      const documents = [];
      const jobsRef = collection(db, 'jobs');
      const q = query(jobsRef, where(payload.key, '==', payload.value));
      const snap = await getDocs(q);
      snap.forEach((doc) => {
        documents.push({ ...doc.data(), id: doc.id });
      });
      return documents;
    } catch (error) {
      return error;
    }
  }
);

const initialState = [];

export const jobCreationFormSlice = createSlice({
  name: 'jobcreation-forms',
  initialState: initialState,
  reducers: {
    resetJobCreationForm() {
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createJobForm.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(fetchJobsByQuery.fulfilled, (state, action) => {
        return (state = {
          ...state,
          cards: action.payload
        });
      });
  }
});

export const { resetJobCreationForm } = jobCreationFormSlice.actions;
export default jobCreationFormSlice.reducer;
