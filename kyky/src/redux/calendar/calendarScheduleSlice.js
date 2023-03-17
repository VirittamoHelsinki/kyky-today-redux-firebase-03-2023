import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { doc, setDoc, collection, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

/* inserts a schedule object (located in payload.data) to a schedule collection 
and returns both schedule name and object if succesfull */
export const createSchedule = createAsyncThunk(
  'calendarSchedules/createSchedule',
  async ({ uid, jobTitle, data }) => {
    try {
      await setDoc(doc(db, 'users', uid, 'schedules', jobTitle), {
        ...data
      });
      return { uid, jobTitle, data };
    } catch (error) {
      return error;
    }
  }
);

/* creates an object with the document name as a key and the list of contents 
as a value, checking if the content exists, returns a list of documents */
export const fetchSchedules = createAsyncThunk('calendarSchedules/fetchSchedules', async (uid) => {
  try {
    const documents = [];
    const snap = await getDocs(collection(db, 'users', uid, 'schedules'));
    snap.docs.map((doc) => {
      let content = [];
      let i = 0;
      while (doc.data()[i]) {
        content.push(doc.data()[i]);
        i++;
      }
      documents.push({ [doc.id]: content });
    });
    return documents;
  } catch (error) {
    return error;
  }
});

/* deletes a document in collection by a name of the document, returns deleted name
for a reducer */
export const removeSchedule = createAsyncThunk(
  'calendarSchedules/removeSchedule',
  async ({ uid, schedule }) => {
    try {
      await deleteDoc(doc(db, 'users', uid, 'schedules', schedule));
      return schedule;
    } catch (error) {
      return error;
    }
  }
);

/* inserts a calendar unavailability to a schedule collection, 
returns the unavailability object  */
export const createUnavailability = createAsyncThunk(
  'calendarUnavailabilities/createUnavailability',
  async ({ uid, data }) => {
    try {
      await setDoc(doc(db, 'users', uid, 'schedules', 'unavailabilities'), {
        ...data
      });
      return { uid, data };
    } catch (error) {
      return error;
    }
  }
);

const initialState = [];

/* createAsyncThunk() generates automatically pending, fulfilled and rejected handling cases.
Add pending and rejected cases when needed */
export const calendarScheduleSlice = createSlice({
  name: 'calendarSchedules',
  initialState: initialState,
  reducers: {
    resetCalendarSchedule() {
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSchedule.fulfilled, (state, action) => {
        return (state = {
          ...state,
          [action.payload.jobTitle]: action.payload.data
        });
      })
      .addCase(fetchSchedules.pending, (state, action) => {
        return (state = {
          ...state,
          loading: true
        });
      })
      .addCase(fetchSchedules.fulfilled, (state, action) => {
        state = initialState;
        action.payload.forEach((job) => {
          state = {
            ...state,
            [Object.keys(job)]: Object.values(job)[0]
          };
        });
        return (state = {
          ...state,
          loading: false
        });
      })
      .addCase(fetchSchedules.rejected, (state, action) => {
        return (state = {
          ...state,
          loading: false
        });
      })
      .addCase(removeSchedule.fulfilled, (state, action) => {
        const new_state = { ...state };
        delete new_state[action.payload + '_schedules'];
        return new_state;
      })
      .addCase(createUnavailability.fulfilled, (state, action) => {
        return (state = {
          ...state,
          unavailabilities: action.payload.data
        });
      });
  }
});

export const { resetCalendarSchedule } = calendarScheduleSlice.actions;
export default calendarScheduleSlice.reducer;
