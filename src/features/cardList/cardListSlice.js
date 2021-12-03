import { createSlice } from '@reduxjs/toolkit';

// create navbar slice of state
export const cardListSlice = createSlice({
  name: 'cardList',
  initialState: {
    posts: []
  },
  reducers: {
    changePost: (state, action) => {
      state.posts = action.payload;
    }
  }
});

// export selectors
export const selectPosts = state => state.cardList.posts;

// export action creators
export const { changePost } = cardListSlice.actions;

// export reducer
export default cardListSlice.reducer;