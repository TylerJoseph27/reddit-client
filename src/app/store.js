import { configureStore } from '@reduxjs/toolkit';
import navbarReducer from '../features/navbar/navbarSlice.js';
import cardListReducer from '../features/cardList/cardListSlice.js';

export const store = configureStore({
  reducer: {
    navbar: navbarReducer,
    cardList: cardListReducer
  },
});
