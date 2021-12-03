import { configureStore } from '@reduxjs/toolkit';
import navbarReducer from '../features/navbar/navbarSlice.js';
import cardListReducer from '../features/cardList/cardListSlice.js';
import searchBarReducer from '../features/searchBar/searchBarSlice.js';

export const store = configureStore({
  reducer: {
    navbar: navbarReducer,
    cardList: cardListReducer,
    searchBar: searchBarReducer
  },
});
