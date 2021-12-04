import { configureStore } from '@reduxjs/toolkit';
import searchBarReducer from '../features/searchBar/searchBarSlice.js';
import cardListReducer from '../features/cardList/cardListSlice.js';
import postReducer from '../features/post/postSlice.js';
import navbarReducer from '../features/navbar/navbarSlice.js';

export const store = configureStore({
  reducer: {
    searchBar: searchBarReducer,
    cardList: cardListReducer,
    post: postReducer,
    navbar: navbarReducer
  },
});
