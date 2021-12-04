import { createSlice } from '@reduxjs/toolkit';

// create cardList slice of state
export const cardListSlice = createSlice({
  name: 'cardList',
  initialState: {
    posts: [],
    activePost: ''
  },
  reducers: {
    changePosts: (state, action) => {
      state.posts = action.payload;
    },
    changeActivePost: (state, action) => {
      state.activePost = action.payload;
    }
  }
});

// export selectors
export const selectPosts = state => state.cardList.posts;
export const selectActivePost = state => state.cardList.activePost;

// export action creators
export const { changePosts, changeActivePost } = cardListSlice.actions;

// export reducer
export default cardListSlice.reducer;