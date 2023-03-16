import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  deleteDoc,
  increment,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../../firebase/firebase';

/* makes reference to get a auto-generated id, inserts the doc 
to Firestore using the new id, returns the added object */
export const createJobForm = createAsyncThunk('jobs/createJobForm', async (payload) => {
  try {
    const timestamp = serverTimestamp();
    const formRef = doc(collection(db, 'jobs'));
    await setDoc(formRef, { ...payload, id: formRef.id, created: timestamp, updated: timestamp });
    return { ...payload, id: formRef.id, created: timestamp };
  } catch (error) {
    return error;
  }
});

export const updateJobForm = createAsyncThunk('jobs/updateJobForm', async ({ id, data }) => {
  try {
    const timestamp = serverTimestamp();
    const jobRef = doc(db, 'jobs', id);
    await setDoc(jobRef, {
      ...data,
      updated: timestamp
    });
    return { ...data, updated: timestamp };
  } catch (error) {
    return error;
  }
});

export const fetchAllJobs = createAsyncThunk('jobs/fetchAllJobs', async () => {
  try {
    const documents = [];
    const snap = await getDocs(collection(db, 'jobs'));
    snap.forEach((doc) => {
      documents.push({ ...doc.data() });
    });
    return documents;
  } catch (error) {
    return error;
  }
});

export const fetchJobsByQuery = createAsyncThunk(
  'jobs/fetchJobsByQuery',
  async ({ key, value }) => {
    try {
      const documents = [];
      const jobsRef = collection(db, 'jobs');
      const q = query(jobsRef, where(key, '==', value));
      const snap = await getDocs(q);
      snap.forEach((doc) => {
        documents.push({ ...doc.data() });
      });
      return documents;
    } catch (error) {
      return error;
    }
  }
);

export const fetchUserProfileJobs = createAsyncThunk(
  'jobs/fetchUserProfileJobs',
  async (payload) => {
    try {
      const documents = [];
      const jobsRef = collection(db, 'jobs');
      const q = query(jobsRef, where('uid', '==', payload));
      const snap = await getDocs(q);
      snap.forEach((doc) => {
        documents.push({ ...doc.data() });
      });
      return documents;
    } catch (error) {
      return error;
    }
  }
);

export const fetchCategoryJobs = createAsyncThunk(
  'jobs/fetchCategoryJobs',
  async ({ key, value }) => {
    try {
      const documents = [];
      const jobsRef = collection(db, 'jobs');
      const q = query(jobsRef, where(key, '==', value));
      const snap = await getDocs(q);
      snap.forEach((doc) => {
        documents.push({ ...doc.data() });
      });
      return documents;
    } catch (error) {
      return error;
    }
  }
);

export const deleteJobById = createAsyncThunk('jobs/deleteJobById', async (jobTitle) => {
  try {
    await deleteDoc(doc(db, 'jobs', jobTitle));
    return jobTitle;
  } catch (error) {
    return error;
  }
});

export const addPageview = createAsyncThunk('jobs/addPageview', async (jobTitle) => {
  try {
    await updateDoc(doc(db, 'jobs', jobTitle), {
      pageviews: increment(1)
    });
  } catch (error) {
    return error;
  }
});

const initialState = {
  cards: []
};

export const jobSlice = createSlice({
  name: 'jobs',
  initialState: initialState,
  reducers: {
    resetJobs() {
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createJobForm.fulfilled, (state, action) => {
        return (state = {
          ...state,
          cards: [...state.cards, { ...action.payload }]
        });
      })
      .addCase(updateJobForm.fulfilled, (state, action) => {
        const filtered = state.cards.filter((c) => c.id !== action.payload.id);
        return (state = {
          ...state,
          cards: [...filtered, { ...action.payload }]
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
            job_title: job.title
          });
        });
        return (state = {
          ...state,
          cards: action.payload,
          titles: [...job_list]
        });
      })
      .addCase(fetchUserProfileJobs.fulfilled, (state, action) => {
        return (state = {
          ...state,
          user: action.payload
        });
      })
      .addCase(fetchCategoryJobs.fulfilled, (state, action) => {
        return (state = {
          ...state,
          all: action.payload
        });
      })
      .addCase(fetchAllJobs.fulfilled, (state, action) => {
        return (state = {
          ...state,
          all: action.payload
        });
      })
      .addCase(deleteJobById.fulfilled, (state, action) => {
        return (state = {
          ...state,
          cards: state.cards.filter((c) => c.id !== action.payload)
        });
      });
  }
});

export const { resetJobs } = jobSlice.actions;
export default jobSlice.reducer;
