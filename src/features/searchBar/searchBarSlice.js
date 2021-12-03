import { createSlice } from '@reduxjs/toolkit';

// create searchBar slice of state
export const searchBarSlice = createSlice({
  name: 'searchBar',
  initialState: {
    searchTerm: ''
  },
  reducers: {
    changeSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    }
  }
});

// export selector
export const selectSearchTerm = state => state.searchBar.searchTerm;

// export action creator
export const { changeSearchTerm } = searchBarSlice.actions;

// export reducer
export default searchBarSlice.reducer;