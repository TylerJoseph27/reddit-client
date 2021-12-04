import { createSlice } from '@reduxjs/toolkit';

// create post slice of state
export const postSlice = createSlice({
  name: 'post',
  initialState: {
    comments: []
  },
  reducers: {
    changeComments: (state, action) => {
      state.comments = action.payload;
    }
  }
});

// export selector
export const selectComments = state => state.post.comments;

// export action creator
export const { changeComments } = postSlice.actions;

// export reducer
export default postSlice.reducer;