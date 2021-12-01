import { createSlice } from '@reduxjs/toolkit';

// create navbar slice of state
export const navbarSlice = createSlice({
  name: 'navbar',
  initialState: {
    subreddits: [],
    activeSubreddit: ''
  },
  reducers: {
    addSubreddit: (state, action) => {
      state.subreddits.push(action.payload);
    },
    changeActiveSubreddit: (state, action) => {
      state.activeSubreddit = action.payload;
    }
  }
});

// export selectors
export const selectSubreddits = state => state.navbar.subreddits;
export const selectActiveSubreddit = state => state.navbar.activeSubreddit;

// export action creators
export const { addSubreddit, changeActiveSubreddit } = navbarSlice.actions;

// export reducer
export default navbarSlice.reducer;