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

export const fetchAllJobs = createAsyncThunk('jobcreation-forms/fetchAllJobs', async () => {
  try {
    const documents = [];
    const snap = await getDocs(collection(db, 'jobs'));
    snap.forEach((doc) => {
      documents.push({ ...doc.data(), id: doc.id });
    });
    return documents;
  } catch (error) {
    return error;
  }
});

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
      .addCase(fetchAllJobs.fulfilled, (state, action) => {
        return (state = {
          ...state,
          cards: action.payload
        });
      })
      /* return user's jobs, also return job titles for calendar components */
      .addCase(fetchJobsByQuery.fulfilled, (state, action) => {
        const jobs = [...action.payload];
        const job_list = [];
        jobs.forEach((job) => {
          job_list.push({
            id: job.title,
            categories: [job.title],
            cities: [job.title],
            jobTitle: job.title
          });
        });
        return (state = {
          ...state,
          cards: action.payload,
          titles: [...job_list]
        });
      });
  }
});

export const { resetJobCreationForm } = jobCreationFormSlice.actions;
export default jobCreationFormSlice.reducer;
