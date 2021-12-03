import { createSlice } from '@reduxjs/toolkit';

// create cardList slice of state
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

// export selector
export const selectPosts = state => state.cardList.posts;

// export action creator
export const { changePost } = cardListSlice.actions;

// export reducer
export default cardListSlice.reducer;