import { createSlice } from '@reduxjs/toolkit';

// create navbar slice of state
export const cardListSlice = createSlice({
  name: 'cardList',
  initialState: {
    posts: []
  },
  reducers: {
    addPost: (state, action) => {
      state.posts.push(action.payload);
    }
  }
});

// export selectors


// export action creators


// export reducer
export default cardListSlice.reducer;