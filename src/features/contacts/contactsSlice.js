import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  contacts: {},
  status: 'idle',
  page: 1,
  query: '',
  stopScroll: false,
  evenOnly: false
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    updateStatus: (state, action) => {
      state.status = action.payload;
    },
    setContacts: (state, action) => {
      state.contacts = action.payload;
    },
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setStopScroll: (state, action) => {
      state.stopScroll = action.payload;
    },
    setEvenOnly: (state, action) => {
      state.evenOnly = action.payload;
    },
    updateContacts: (state, action) => {
      state.contacts = {...state.contacts, ...action.payload};
      state.page = state.page + 1;
      state.status = 'idle';
    },
    updatePage: (state, action) => {
      state.page = action.payload;
    },
    resetContacts: (state, action) => {
      state.contacts = {};
    },
  },
});

export const { updateStatus, setContacts, setQuery, setStopScroll, setEvenOnly, updateContacts, updatePage, resetContacts } = contactsSlice.actions;

export default contactsSlice.reducer;
