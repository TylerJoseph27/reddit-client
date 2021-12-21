import { createSlice } from '@reduxjs/toolkit';

// create post slice of state
export const postSlice = createSlice({
  name: 'post',
  initialState: {
    currentPost: {},
    comments: []
  },
  reducers: {
    changeCurrentPost: (state, action) => {
      state.currentPost = action.payload;
    },
    changeComments: (state, action) => {
      state.comments = action.payload;
    }
  }
});

// export selectors
export const selectCurrentPost = state => state.post.currentPost;
export const selectComments = state => state.post.comments;

// export action creators
export const { changeCurrentPost, changeComments } = postSlice.actions;

// export reducer
export default postSlice.reducer;