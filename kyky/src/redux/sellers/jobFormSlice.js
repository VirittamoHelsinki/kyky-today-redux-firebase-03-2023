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
export const createJobForm = createAsyncThunk('jobForms/createJobForm', async (payload) => {
  try {
    const datenow = serverTimestamp();
    const formRef = doc(collection(db, `jobs`));
    await setDoc(formRef, { ...payload, created: datenow });
    return { ...payload, id: formRef.id, created: datenow };
  } catch (error) {
    return error;
  }
});

export const fetchAllJobs = createAsyncThunk('jobForms/fetchAllJobs', async () => {
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
  'jobForms/fetchJobsByQuery',
  async ({ key, value }) => {
    try {
      const documents = [];
      const jobsRef = collection(db, 'jobs');
      const q = query(jobsRef, where(key, '==', value));
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

export const fetchUserProfileJobs = createAsyncThunk(
  'jobForms/fetchUserProfileJobs',
  async (payload) => {
    try {
      const documents = [];
      const jobsRef = collection(db, 'jobs');
      const q = query(jobsRef, where('uid', '==', payload));
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

export const fetchCategoryJobs = createAsyncThunk(
  'jobForms/fetchCategoryJobs',
  async ({ key, value }) => {
    try {
      const documents = [];
      const jobsRef = collection(db, 'jobs');
      const q = query(jobsRef, where(key, '==', value));
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

export const deleteJobById = createAsyncThunk('jobForms/deleteJobById', async (jobId) => {
  try {
    await deleteDoc(doc(db, 'jobs', jobId));
    return jobId;
  } catch (error) {
    return error;
  }
});

export const addPageview = createAsyncThunk('jobForms/addPageview', async (jobId) => {
  try {
    await updateDoc(doc(db, 'jobs', jobId), {
      pageviews: increment(1)
    });
  } catch (error) {
    return error;
  }
});

const initialState = {
  cards: []
};

export const jobCreationFormSlice = createSlice({
  name: 'jobForms',
  initialState: initialState,
  reducers: {
    resetJobCreationForm() {
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
      })
      .addCase(fetchUserProfileJobs.fulfilled, (state, action) => {
        return (state = {
          ...state,
          userProfileCards: action.payload
        });
      })
      .addCase(fetchCategoryJobs.fulfilled, (state, action) => {
        return (state = {
          ...state,
          categoryCards: action.payload
        });
      })
      .addCase(fetchAllJobs.fulfilled, (state, action) => {
        return (state = {
          ...state,
          categoryCards: action.payload
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

export const { resetJobCreationForm } = jobCreationFormSlice.actions;
export default jobCreationFormSlice.reducer;
